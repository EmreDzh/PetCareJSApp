import * as api from './api.js'

const options = {
    getPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    createPet: '/data/pets',
    getWithId: '/data/pets/',
    deletePet: '/data/pets/',
    editPet: '/data/pets/',
    donateToPet: '/data/donation',
    donationCount: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    totalDonations: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getPets(){
    return await api.get(options.getPets);
}

export async function createPet(data){
    return await api.post(options.createPet, data);
}

export async function getWithId(id){
    return await api.get(options.getWithId + id);
}

export async function deleteWithId(id){
    return await api.del(options.deletePet + id);
}

export async function editPet(id, data){
    return await api.put(options.editPet + id, data);
}

export async function donatePet(data){
    return await api.post(options.donateToPet, data);
}

export async function getDonateAmount(petId){
    return await api.get(options.donationCount(petId));
}

export async function totalDonos(petId, userId){
    return await api.get(options.totalDonations(petId, userId));
}