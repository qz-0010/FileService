const axios = require('axios');

module.exports = () => {
    window.onload = function() {
        const form = document.forms.upload;
        const $loader = form.querySelector('.form__loader');
        
        form.onsubmit = function(e) {
            e.preventDefault();
            var data = new FormData();
            var files = form.files.files;

            for(var i=0; i < files.length; i++){
                data.append('files', files[i]);
            }

            axios.post('/upload', data, {
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        var percentage = (e.loaded / e.total) * 100;
                        $loader.style.width = percentage + "%";
                        console.log(percentage + "%");
                    }
                }
            });
        }
    }
}