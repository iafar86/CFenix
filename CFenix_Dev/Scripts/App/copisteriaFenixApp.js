/// <reference path="Insumos/Partials/forms_layouts.html" />
/// <reference path="Insumos/Partials/forms_layouts.html" />
var copisteriaFenixApp = angular.module('copisteriaFenixApp', ['ngRoute', 'ngResource', 'ui.router', 'ngCookies',
  'ngSanitize']) //fpaz: defino el modulo con las librerias para routing (ui.router), usar apis rest y para interfaz de usuarios con angular(ui.bootstrap)
    .config(function ($stateProvider, $urlRouterProvider) { //fpaz: configuro el routing de los states usando los servicios $stateProvider y $urlRouteProvider
        
        // fpaz:para cualquier caso que no este definido se va al estado del home mostrando grupos
        $urlRouterProvider.otherwise("/Usuarios")

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app
        
        //#region Cuentas Corrientes
          .state('cuentasCorrientes', {
              url: "/Cuentas",
              views: {
                  'headerAdmin': {
                      templateUrl: '/Scripts/App/Partials/Header.html',
                      controller: ''
                  },
                  'menuAdmin': {
                      templateUrl: '/Scripts/App/Partials/Menu.html',
                      controller: ''
                  },
                  'dashboard': {
                      templateUrl: '/Scripts/App/Partials/Dashboard.html',
                      controller: '',
                      resolve: {
                          user: 'User',
                          authenticationRequired: function (user) {
                              user.isAuthenticated();
                          }
                      }
                  }
              }
          })

          .state('algo', {
              url: "/Tablas",
              views: {
                  'headerAdmin': {
                      templateUrl: '/Scripts/App/Partials/Header.html',
                      controller: ''
                  },
                  'menuAdmin': {
                      templateUrl: '/Scripts/App/Partials/Menu.html',
                      controller: ''
                  },
                  'dashboard': {
                      templateUrl: '/Scripts/App/CuentasCorrientes/Partials/tables_simple.html',
                      controller: '',
                      resolve: {
                          user: 'User',
                          authenticationRequired: function (user) {
                              user.isAuthenticated();
                          }
                      }
                  }
              }
          })

            .state('Insumos', {
                url: "/Tablas",
                views: {
                    'headerAdmin': {
                        templateUrl: '/Scripts/App/Partials/Header.html',
                        controller: ''
                    },
                    'menuAdmin': {
                        templateUrl: '/Scripts/App/Partials/Menu.html',
                        controller: ''
                    },
                    'dashboard': {
                        templateUrl: '/Scripts/App/Insumos/Partials/forms_layouts.html',
                        controller: '',
                        resolve: {
                            user: 'User',
                            authenticationRequired: function (user) {
                                user.isAuthenticated();
                            }
                        }
                    }
                }
            })

        //#endregion     

        //#region Usuarios y Login

          .state('usuarios', {
              url: "/Usuarios",
              views: {
                  'headerAdmin': {
                      templateUrl: '/Scripts/App/Partials/Header.html',
                      controller: ''
                  },
                  'menuAdmin': {
                      templateUrl: '/Scripts/App/Partials/Menu.html',
                      controller: ''
                  },
                  'dashboard': {
                      templateUrl: '/Scripts/App/Usuarios/Partials/List.html',
                      controller: '',
                      resolve: {
                          user: 'User',
                          authenticationRequired: function (user) {
                              user.isAuthenticated();
                          }
                      }
                  }
              }
          })
        .state('login', {
            url: "/login",
            views: {
                'dashboard': {
                    templateUrl: '/Scripts/App/Partials/Login.html',
                    controller: 'LoginCtrl',
                    resolve: {}
                }
            }
        }).state('signup', {
            url: "/signup",
            views: {
                'dashboard': {
                    templateUrl: '/Scripts/App/Partials/Signup.html',
                    controller: 'signupController',
                    resolve: {}
                }
            }
        }).state('logout', {
            templateUrl: '/Scripts/App/Partials/Login.html',
            controller: 'LogoutCtrl'
        })

        //#endregion
    })

    //rsanch Login antes de ver el state de ingresos.
    .run(function ($rootScope, $state, User) {
        try {
            User.isAuthenticated();
        } catch (e) {
            // do nothing with this error
        }
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error.name === 'AuthenticationRequired') {
                User.setNextState(toState.name, 'Debes Iniciar Sesion para ver esta pagina');
                $state.go('login', {}, { reload: true });
            }
        });
    });