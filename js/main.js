'use strict'
let bin = document.querySelector('textarea.binaryT');
let dec = document.querySelector('textarea.decimalT');

let change = document.querySelector('.convert-box .change');

console.log(change)

change.addEventListener('click', () => {
  let content = document.querySelector('.convert-box');
  document.querySelectorAll('.convert-box .title, .convert-box .content').forEach (el => {
    el.classList.add('animate')
  })
  document.querySelector('.error') != undefined ? document.querySelector('.error').classList.remove('error') : ""
  setTimeout(() => {
    content.style.flexDirection == 'row-reverse' ? content.style.flexDirection = 'row' : content.style.flexDirection = 'row-reverse'
    document.querySelectorAll('.convert-box .title, .convert-box .content').forEach (el => {
      el.classList.remove('animate')
    })
    bin.classList.toggle('dis');
    dec.classList.toggle('dis');
    document.querySelector('textarea:not(.dis)').removeAttribute('disabled');
    document.querySelector('textarea.dis').setAttribute('disabled', 'true');
  }, 500);
})


function transformBinaray(e) {

  // Main Var
  let decDis = document.querySelector('textarea.decimalT.dis');
  let result = [];
  let valueArray = [...e.value];

  // Set Range To Check
  let range = {
    min: 0,
    max: 1,
  };

  let check = valueArray.every(function (e) {
    return e >= this.min && e <= this.max
  }, range)

  if (check == true && e.value.length >= 1) {
    for (let i = 0; i < valueArray.length; i++) {
      result.push(valueArray[i] * Math.pow(2,valueArray.length - (i+1)))
    }

    let finalResult = 0;
    result.forEach(el => {
      finalResult += Number(el);
    });

    decDis.value = finalResult.toLocaleString('fullwide', { useGrouping: false })
    bin.classList.remove('error')
  } else if (e.value.length < 1) {
    decDis.value = ''
    bin.classList.remove('error')
  } else {
    bin.classList.add('error')
    decDis.value = 'Oops! Invaild Code'
  }
}

function transformDecmail (e) {

  // Main Var
  let binDis = document.querySelector('textarea.binaryT.dis');

  let value = e.value;

  let maxNum = [];
  let result = [1];

  if (!isNaN(value) && value.length >= 1) {
    for(let i = 0;; i++) {
      let condinetion = Math.pow(2,i)
      if (condinetion > value) {
        break;
      } else {
        maxNum.push( Math.pow(2,i))
      }
    }

    maxNum.reverse();
    let mainCalc = maxNum[0]

    for (let i = 1; i < maxNum.length ; i++) {
      if ((mainCalc + maxNum[i]) > value) {
        result[i] = 0
      } else {
        mainCalc += maxNum[i]
        result[i] = 1
      }
    }
    binDis.value = result.join("");
    dec.classList.remove('error')
  } else if (value.length < 1) {
    binDis.value = ''
    dec.classList.remove('error')
  } else {
    dec.classList.add('error')
    binDis.value = 'Oops! Invaild Number'
  }

}

bin.addEventListener('input', function () {
  transformBinaray(this)
})

dec.addEventListener('input', function () {
  transformDecmail(this)
})