import './commands';
import '@shelex/cypress-allure-plugin';
import '@testing-library/cypress/add-commands';


Cypress.on('uncaught:exception', () => false);

const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
 const style = app.document.createElement("style");
 style.innerHTML =".command-name-request, .command-name-xhr { display: none }";
 style.setAttribute("data-hide-command-log-request", "");
 app.document.head.appendChild(style); 
}
