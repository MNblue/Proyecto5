import Swal from 'sweetalert2';
import './alert.css'

function Validate(user) {
   

    if (!user.useremail ||
        !user.userpassword
      ) {
        Swal.fire({
            //imageUrl: 'https://media.tenor.com/TWMxi0kGDTgAAAAi/hmm.gif',
            imageUrl: 'https://gifdb.com/images/high/sleepy-spongebob-thinking-hmm-h9j62biguqh31mbk.gif',
            title: 'Hmmm...parece que  hay campos vacíos!',
            text: 'Asegúrate de llenar todos los campos',
        });
        return false;

    } else {
        return true;
    }
};

export default Validate;