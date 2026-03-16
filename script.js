// compute, starth,startm,endh,endm

function compute() {
    const starth = parseInt(document.getElementById("starth").value);
    const startm = parseInt(document.getElementById("startm").value);
    var endh = parseInt(document.getElementById("endh").value);
    const endm = parseInt(document.getElementById("endm").value);

    if (isNaN(starth) || isNaN(startm) || isNaN(endh) || isNaN(endm)) {
        return;
    }


    // osetreni pres pulnoc
    if (endh < starth || (endh === starth && endm < startm)) {
        endh += 24;
    }

    // vypocet celkoveho casu smeny
    const start = starth * 60 + startm;
    const end = endh * 60 + endm;
    const diff = end - start;

    const length_hours = Math.floor(diff / 60);
    const length_minutes = diff % 60;

    const result = document.getElementById("progress-total-time");
    result.innerHTML = `Tato směna má celkově trvat <div class="highlight">${length_hours}h ${length_minutes}m</div>`;

    // vypocet procenta
    let now = new Date();
    let nowh = now.getHours();
    let nowm = now.getMinutes();
    let nowtotal = nowh * 60 + nowm;
    
    let workedperc = (nowtotal - start) / (end - start) * 100;
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text-percentage");
    const progressRemaining = document.getElementById("progress-text-time");
    
    progressBar.style.width = `${workedperc}%`;
    progressText.innerHTML = `Odpracováno ${workedperc.toFixed(1)}% směny`;

    let remaining = end - nowtotal;
    console.log(remaining);
    let remaining_hours = Math.floor(remaining / 60);
    let remaining_minutes = remaining % 60;

    console.log(remaining_hours, remaining_minutes);
    if (remaining < 0) {
        progressRemaining.innerHTML = `Přebývá ${remaining}m`;
    } else if (remaining < 60) {
        progressRemaining.innerHTML = `Zbývá jen ${remaining_minutes}m`;
    } else {
        progressRemaining.innerHTML = `Zbývá jen ${remaining_hours}h ${remaining_minutes}m`;
    }

    const worked_hours = Math.floor((nowtotal - start) / 60);
    const worked_minutes = (nowtotal - start) % 60;
    if (worked_hours < 1) {
        document.getElementById("progress-worked-hours").innerHTML = `Již máš odpracováno <div class="highlight">${worked_minutes}m</div>!`;
    }else {
        document.getElementById("progress-worked-hours").innerHTML = `Již máš odpracováno <div class="highlight">${worked_hours}h ${worked_minutes}m</div>!`;
    }

    const total_hours = Math.floor(diff / 60);
    const total_minutes = diff % 60;
    document.getElementById("progress-total-time").innerHTML = `Tato směna má celkově trvat <div class="highlight">${total_hours}h ${total_minutes}m</div>`;
        

}

// addEventListener("DOMContentLoaded", () => {
//     document.getElementById("compute").addEventListener("click", compute);
// });

setInterval(compute, 1000); // aktualizace každou minutu