
let container = document.getElementById("reports-container");
let waiting = document.getElementById('waiting');
let approved = document.getElementById('approved');
let  rejected = document.getElementById('rejected');
document.addEventListener('DOMContentLoaded', async () => {
    let response = await fetch('https://liftup-rb7p.onrender.com/reports', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    if(response.ok)
    {

        let data = await response.json();
        let status = null;
        for(let report of data)
        {
            CreateElements(report);
        }
        rejected.addEventListener('click', (e) =>{
            e.preventDefault();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            status = 'reject'
            for(let report of data)
            {
                if(report.Status == status)
                {
                    CreateElements(report);
                }
            }

        });
        approved.addEventListener('click', (e) =>{
            e.preventDefault();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            status = 'approve';


            for(let report of data)
            {

                if(report.Status == status)
                {
                    CreateElements(report);
                }
            }

        });
        waiting.addEventListener('click', (e) =>{
            e.preventDefault();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            status = 'waiting';
            for(let report of data)
            {
                if(report.Status == status)
                {
                    CreateElements(report);
                }
            }
        });




    }
})
function CreateElements(reports)
{
    let div= document.createElement("div");
    div.classList.add("reports");
    div.id = reports.ID;
    let p = document.createElement("p");
    p.textContent = (reports.report).title;
    div.appendChild(p);
    container.appendChild(div);
}
document.addEventListener('click', (event) => {
    if(event.target.classList.contains("reports")) {
        window.location.href =`report.html?id=${event.target.id}`;
    }
})