import { html } from "../../node_modules/lit-html/lit-html.js";
import * as petShopService from '../api/petShop.js'
import { createSubmitHandler } from "../util.js";

const editTemplate = (pets, onSubmit) => html`
    <!--Edit Page-->
    <section id="editPage">
            <form @submit=${onSubmit} class="editForm">
                <img src=${pets.image}>
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${pets.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${pets.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${pets.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${pets.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value=${pets.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;

export async function editPage(ctx){
    const petId = ctx.params.id;
    const pets = await petShopService.getWithId(petId);
    
    ctx.render(editTemplate(pets, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    const petId = ctx.params.id;

    const nam = document.getElementById('name');
    const br = document.getElementById('breed');
    const ag = document.getElementById('age');
    const wght = document.getElementById('weight');
    const img = document.getElementById('image');

    if(nam.value == '' || br.value == '' || ag.value == '' || wght.value == '' || img.value == ''){
        return window.alert('All fields are required!');
    }

    await petShopService.editPet(petId, {
        name: data.name,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        image: data.image
    });

    event.target.reset();
    ctx.page.redirect('/details/' + petId);
}