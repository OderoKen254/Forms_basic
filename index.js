document.querySelector('#my_form').addEventListener('submit', (addEventListener)=> {
    event.preventDefault();

    //accessing form elements
    let username =document.querySelector('#username').value.trim();
    let password =document.querySelector('#password').value.trim();
    let email =document.querySelector('#email').value.trim();
    let phone =document.querySelector('#phone').value.trim();


    if 
        (!username || !password || !email || !phone) {
            alert("All fields are required");
    }else 
        {alert(`Welcome ${username}, login successful`);
    }
});
