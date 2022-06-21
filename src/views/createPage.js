import { html } from "../../node_modules/lit-html/lit-html.js";
import * as petShopService from '../api/petShop.js'
import { createSubmitHandler } from "../util.js";

const createTemplate = (onSubmit) => html`
    
        <!--Create Page-->
        <section id="createPage">
            <form @submit=${onSubmit} class="createForm">
                <img src="./images/cat-create.jpg">
                <div>
                    <h2>Create PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" placeholder="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" placeholder="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" placeholder="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Create Pet</button>
                </div>
            </form>
        </section>
`;

export function createPage(ctx){
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    const nam = document.getElementById('name');
    const br = document.getElementById('breed');
    const ag = document.getElementById('age');
    const wght = document.getElementById('weight');
    const img = document.getElementById('image');

    if(nam.value == '' || br.value == '' || ag.value == '' || wght.value == '' || img.value == ''){
        return window.alert('All fields are required!');
    }

    await petShopService.createPet({
        name: data.name,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        image: data.image
    });
    event.target.reset();
    ctx.page.redirect('/');
}