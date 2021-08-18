


const calculator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    waitingForSecondNumber: false
};



function updateDisplay(){
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}


function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}


function inputDigital(digit){
    if (calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
    }
    
}

function inverseNumber(){
    if(calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber *= -1;
}

function handleOperator(operator){
    if (!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }
    else{
        alert('Operator Sudah anda Terapkan');
    }
}

/*
Terakhir kita gunakan fungsi putHistory() yang sudah kita buat ketika kalkulator 
melakukan proses kalkulasi, tepatnya pada fungsi performCalculation() 
berkas kalkulator.js.

Sebelum memanggil fungsi putHistory(), tentu kita harus menyiapkan data 
yang akan dikirimkan sebagai argumen fungsi tersebut. 
Pada performCalculation() kita buat variabel baru dengan nama history 
yang merupakan objek dari data history yang akan dikirimkan. 
Struktur objeknya tampak seperti berikut:

const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
}

Setelah menyiapkan datanya, barulah kita bisa memanggil fungsi putHistory() 
dengan mengirimkan variabel history sebagai argumen fungsinya. 

Jangan lupa juga panggil fungsi renderHistory() agar riwayat kalkulasi 
langsung tampil pada tabel setelah kalkulasi dilakukan.


*/

function performCalculation(){
    if(calculator.firstNumber == null || calculator.operator == null){
        alert("Operator atau angka belum dimasukkan dengan benar");
        return;
    }

    let result = 0;
    if (calculator.operator === '+'){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    const history = {
        firstNumber : calculator.firstNumber,
        secondNumber : calculator.displayNumber,
        operator : calculator.operator,
        result : result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

/*
Sehingga sekarang struktur kode dari fungsi performCalculation() akan tampak seperti berikut:

function performCalculation() {
   if (calculator.firstNumber == null || calculator.operator == null) {
       alert("Anda belum menetapkan operator");
       return;
   }
 
   let result = 0;
   if (calculator.operator === "+") {
       result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
   } else {
       result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
   }
 
   // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
   }
   putHistory(history);
   calculator.displayNumber = result;
   renderHistory();
}
Pada tahap ini seharusnya kalkulator kita sudah dapat menampilkan riwayat kalkulasi 
yang dilakukan pengguna.


*/





const buttons = document.querySelectorAll(".button");

for (let button of buttons){
    button.addEventListener('click',function(event){
        // mendapatkan objek yang diklik 
            const target = event.target; // keluarnya <div class = "button"> 9 </div>
                    //console.log(target.innerText);
            if(target.classList.contains('clear')){
                clearCalculator();
                updateDisplay();
                return;
            }
            if(target.classList.contains('negative')){
                inverseNumber();
                updateDisplay();
                return;
            }if(target.classList.contains('equals')){
                performCalculation();
                updateDisplay();
                return;
            }if(target.classList.contains('operator')){
                handleOperator(target.innerText);//target.innerText ==> isi dalam text <div>isi</div>
                return;
            }

            inputDigital(target.innerText);
            updateDisplay();
    })
}

/*

Selamat, Anda sudah berhasil membuat aplikasi kalkulator berbasis web dengan baik. 
Good Job!



*/