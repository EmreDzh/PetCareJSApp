import page from "../node_modules/page/page.mjs";
import { logout } from "./api/user.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { createPage } from "./views/createPage.js";
import { dashboardPage } from "./views/dashboardPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";

page(addSession);
page(addRender);

page('/', homePage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/logout', onLogout);

page('/details/:id', detailsPage);
page('/edit/:id', editPage);



page.start();

async function onLogout(ctx){
    logout();
    ctx.page.redirect('/');
}