import request from './services.js';

const URL_REGISTER = 'http://localhost:4040/register';
let data = {};

/**
 * DOM variables
 */
const input_Username = document.querySelector('.input_Username');
const input_Password = document.querySelector('.input_Password');
const register_Username = document.querySelector('.register_Username');
const register_Password = document.querySelector('.register_Password');
const register_Name = document.querySelector('.register_Name');
const register_Lastname = document.querySelector('.register_Lastname');
const register_Number = document.querySelector('.register_Number');
const register_Address = document.querySelector('.register_Address');
const btn_Register = document.querySelector('.btn_Register');


const register_Event = (() => {
    data = {
        username: register_Username.value,
        password: register_Password.value,
        name: register_Name.value,
        lastname: register_Lastname.value,
        phone_number: register_Number.value,
        delivery_address: register_Address.value
    };

    request.register(URL_REGISTER, data)
        .then((response) =>
            console.log(response)
        ).catch((error) =>
            console.log(error)
        )

})

btn_Register.addEventListener('click', () => {
    console.log('hola');
    register_Event();
});