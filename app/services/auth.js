myApp	/********************************************************************************************************
	*
	* Auth Service
	*
	********************************************************************************************************/.service('AuthService', ['$q', '$http', 'USER_ROLES', '$state', function ($q, $http, USER_ROLES, $state) {
		var LOCAL_TOKEN_KEY = 'yourTokenKey';
		var type = '';
		var isAuthenticated = false;
		var role = '';
		var authToken;
		var formData = {
			'email': '',
			'password': ''
		};

		var tokenstring = '';

		function loadUserCredentials() {
			var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
			//console.log(token);
			if (token) {
				useCredentials(token);
			}
		}

		function storeUserCredentials(token) {
			window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
			useCredentials(token);
		}

		function useCredentials(token) {
			type = token.split('.')[0];
			isAuthenticated = true;
			authToken = token;

			console.log(token);
			if (type == 'admin') {
				role = USER_ROLES.admin
			}
			if (type == 'm1p2h31') {
				role = USER_ROLES.public;
			}

			// Set the token as header for your requests!
			/*var defaulthttpHeaders = {
							'Content-Type':'application/json',
							'Accept':'application/json',
							'Authorization' : token
						};*/
			//$http.defaults.headers = defaulthttpHeaders;

			$http.defaults.headers.common['Authorization'] = token;

		}

		function destroyUserCredentials() {
			authToken = undefined;
			type = '';
			isAuthenticated = false;
			$http.defaults.headers.common['Authorization'] = undefined;
			window.localStorage.removeItem(LOCAL_TOKEN_KEY);
		}

		var login = function (name, pw) {
			formData = {
				'email': name,
				'password': pw
			};
			
			return $q(function (resolve, reject) {

				$http.post('http://localhost:8081/api/login/', formData)
					.success(function (data) {
						tokenstring = data.token;
						console.log(data);
						console.log(tokenstring);
						console.log('is authenticated? ' + isAuthenticated);

						storeUserCredentials(tokenstring);
						$state.go('panel');
						resolve('Login sucess.')
					})
					/**************************************************************
					*
					*   Error que se muestra con el servidor
					*   
					*
					***************************************************************/
					.error(function (data, status, headers, config) {
						reject('Login Failed.');
					});
			})


			/*   
					return $q(function(resolve, reject) {
						if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
							// Make a request and receive your auth token from your server
							storeUserCredentials(name + '.yourServerToken');
							resolve('Login success.');
						} else {
							reject('Login Failed.');
						}
					});
					*/
		}


		var logout = function () {
			destroyUserCredentials();
		};

		var isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
		};

		loadUserCredentials();

		return {
			login: login,
			logout: logout,
			isAuthorized: isAuthorized,
			isAuthenticated: function () { return isAuthenticated; },
			type: function () { return type; },
			role: function () { return role; }
		};
	}])


	.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
		return {
			responseError: function (response) {
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					403: AUTH_EVENTS.notAuthorized
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})

	.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);