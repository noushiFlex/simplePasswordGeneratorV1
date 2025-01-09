let passwordResult = document.querySelector('#password_result');
const checkbox = document.querySelectorAll('input[type=checkbox]');
const rangebox = document.querySelector('input[type=number]');
const buttonGenerate = document.getElementById('buttonGen');
const copyButton = document.getElementById('copyButton');

const normal = 'abcdefghijklmnopqrstuvwxyz';
const number = '1234567890';
const char = `@#$%^&*()_+}{":?><,./;'`;
const maj = 'QWERTYUIOPASDFGHJKLZXCVBNM';

function generation(e) {
    e.preventDefault();
    let final_char = '';
    let result = '';
    const length = parseInt(rangebox.value);

    for (let j = 0; j < checkbox.length; j++) {
        if (checkbox[j].checked) {
            if (checkbox[j].id === 'numberbox') {
                final_char += number;
            } else if (checkbox[j].id === 'charbox') {
                final_char += char;
            } else if (checkbox[j].id === 'majbox') {
                final_char += maj;
            }
        }
    }

    // Toujours inclure les lettres minuscules
    final_char += normal;

    // Générer le mot de passe
    for (let i = 0; i < length; i++) {
        result += final_char.charAt(Math.floor(Math.random() * final_char.length));
    }

    // Afficher le mot de passe
    passwordResult.innerHTML = result;
}

function copyToClipboard() {
    const password = passwordResult.innerHTML;

    if (password) {
        // Méthode universelle avec <textarea>
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed'; // Pour éviter que la boîte ne défile
        textarea.style.opacity = '0'; // Rendre invisible
        textarea.select();

        try {
            const success = document.execCommand('copy');
            if (success) {
                alert("Mot de passe copié : " + password);
            } else {
                alert("Échec de la copie. Essayez manuellement !");
            }
        } catch (err) {
            console.error("Erreur lors de la copie : ", err);
            alert("Impossible de copier le mot de passe !");
        }

        document.body.removeChild(textarea);
    } else {
        alert("Aucun mot de passe généré à copier !");
    }
}

// Écouteurs d'événements
buttonGenerate.addEventListener("click", generation);
copyButton.addEventListener("click", copyToClipboard);
