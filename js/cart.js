var firebaseConfig = {
    apiKey: "AIzaSyCUKiEflt_OedWYWAnbleDNmpEOirvEUVs",
    authDomain: "bings-coffee-house.firebaseapp.com",
    databaseURL: "https://bings-coffee-house-default-rtdb.firebaseio.com",
    projectId: "bings-coffee-house",
    storageBucket: "bings-coffee-house.appspot.com",
    messagingSenderId: "746729350587",
    appId: "1:746729350587:web:80babe65edaa1228f8d09e",
    measurementId: "G-K6T54NDE6V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  function total(){
    var productsLocal = JSON.parse(localStorage.getItem('cart'));
  let total=0;
  for(let index = 0; index < productsLocal.length; index++){
    if(productsLocal[index].cart){
      total+=parseInt(productsLocal[index].total);
    }
  }
  console.log(total);
  return total
  }

  var con=0;
  var con2=JSON.parse(localStorage.getItem('positions'));

  function clean(){
    document.getElementById('tableProducts').innerHTML='';
    document.getElementById('total').innerHTML='';
    var cartn = document.getElementById('cart_n');
    cartn.innerHTML='';
    localStorage.clear();


  }


  function remove(id){
    var productsLocal=JSON.parse(localStorage.getItem('cart'));
    for (let index=0; index < productsLocal.length; index++){
      if(productsLocal[index].id==id){
        var x=productsLocal[index].id;
        productsLocal.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(productsLocal));

        total();
        for(let index2 = 0; index2 < con2.length; index2++){
          if(x==con2[index2]) {
            con2.splice(index2,1);
            localStorage.setItem('positions',JSON.stringify(con2));
          } else {

          }
        }
updateCart();
 } else{
  updateCart();
 }

 }
}

function updateCart(){
  con=0;
  var cartn=document.getElementById('cart_n');
  var productsLocal=JSON.parse(localStorage.getItem('cart'));
  cartn.innerHTML=`[${productsLocal.length}]`;
  document.getElementById('tableProducts').innerHTML='';
  for(let index=0; index < con2.length; index++){
    var position= con2[index];
    for(let index3 = 0; index3 < productsLocal.length; index3++){
      if(position==productsLocal[index3].id){
        document.getElementById('tableProducts').innerHTML+=`
        <tr>
        <th>${con+1}</th>
        <td><button class="waves-effect waves-light btn red darken-4" onclick="remove(${productsLocal[index3].id})">X</button></td>
        <td><img style="width:5rem;" src="${productsLocal[index3].img}"></td>
        <td> ${productsLocal[index3].name} </td>
        <td>
        <button class="waves-effect waves-light btn purple darken-4" onclick="reduceAmount(${productsLocal[index3].id})">-</button>
        <input style="width:2rem;" id="${productsLocal[index3].id}" value="${productsLocal[index3].quantity}"disabled>
        <button class="waves-effect waves-light btn purple darken-4" onclick="addAmount(${productsLocal[index3].id})">+</button>
</td>
<td>$ ${productsLocal[index3].price*productsLocal[index3].quantity}</td>
</tr>
        `
        productsLocal[index3].total=productsLocal[index3].price*productsLocal[index3].quantity
        localStorage.setItem('cart',JSON.stringify(productsLocal));
} else{

}

    }
    con=con+1;
  }
  if(total()==0){
    document.getElementById('total').innerHTML='';
  }else{
    document.getElementById('total').innerHTML=`
    <tr>
    <th></th>
    <td></td>
    <td></td>
    <td></td>

<td>
<h5>Total:</h5>
</td>
<td>
$ ${total()}.00
</td>
    </tr>
<tr>
<th></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <button onclick="clean()" class="yellow accent-4 waves-effect waves-light btn">Clean</button>
</td>
<td>
<button href="#modal1" class="modal-trigger green accent-4 waves-effect waves-light btn">Buy</button>
</td>
</tr>

    `
  }

}
function reduceAmount(id) {
  var productsLocal=JSON.parse(localStorage.getItem('cart'));
  for(let index=0; index < productsLocal.length; index++){
    if(productsLocal[index].id==id){
      if(productsLocal[index].quantity>1){
        productsLocal[index].quantity=parseInt(productsLocal[index].quantity)-1;
        localStorage.setItem("cart",JSON.stringify(productsLocal));
        updateCart();
      }else{

      }
    }else{

    }

  }
}
function addAmount(id) {
  var productsLocal=JSON.parse(localStorage.getItem('cart'));
  for(let index=0; index < productsLocal.length; index++){
    if(productsLocal[index].id==id){
      if(productsLocal[index].quantity>0){
        productsLocal[index].quantity=parseInt(productsLocal[index].quantity)+1;
        localStorage.setItem("cart",JSON.stringify(productsLocal));
        updateCart();
      }else{

      }
    }else{

    }

  }
}

//RENDER
(()=>{
  var productsLocal=JSON.parse(localStorage.getItem('cart'));
  var cartn= document.getElementById('cart_n');

  for(let index=0; index<productsLocal.length;index++){
    document.getElementById('tableProducts').innerHTML+=`

<tr>
<th>${index+1}</th>
<td><button class="waves-effect waves-light btn red darken-4" onclick="remove(${productsLocal[index].id})">X</button></td>
<td><img style="width:5rem;" src="${productsLocal[index].img}"></td>
<td>${productsLocal[index].name}</td>
<td>
<button class="waves-effect waves-light btn purple darken-4" onclick="reduceAmount(${productsLocal[index].id})">-</button>
<input style="width:2rem;" id="${productsLocal[index].id}" value="${productsLocal[index].quantity}" disabled>
<button class="waves-effect waves-light btn purple darken-4" onclick="addAmount(${productsLocal[index].id})">+</button>
</td>
<td>$ ${productsLocal[index].price*productsLocal[index].quantity}</td>
</tr>
`;
productsLocal[index].total=productsLocal[index].price*productsLocal[index].quantity
localStorage.setItem('cart',JSON.stringify(productsLocal));
}

if(total()==0){
  document.getElementById('total').innerHTML='';
}else{
  document.getElementById('total').innerHTML=`
<tr>
<th></th>
<td></td>
<td></td>
<td></td>

<td>
<h5>Total:</h5>
</td>
<td>
$ ${total()}.00
</td>
</tr>
<tr>
<th></th>
<td></td>
<td></td>
<td></td>
<td>
<button onclick="clean()" class="yellow accent-4 waves-effect waves-light btn">Clean</button>
</td>
<td>
<button href="#modal1" class="modal-trigger green accent-4 waves-effect waves-light btn">Buy</button>
</td>
</tr>

  `
}

cartn.innerHTML=`[${productsLocal.length}]`;
})();
$(document).ready(()=>{
$('.modal').modal();
var userName= document.getElementById('userName');
var userEmail= document.getElementById('userEmail');
var userSelect= document.getElementById('userSelect');
var d= new Date();
var t=d.getTime();
var order=t-300;


$("#formCart").submit(function(e){
  e.preventDefault();
  var pp=JSON.parse(localStorage.getItem("cart"));
  firebase.firestore().collection("sales").add({
    id: t+1,
    userOrder:order,
    userName:userName.value,
    userEmail:userEmail.value,
    payment:userSelect.value,
    userDate: d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear(),
    hour:d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),
    userYear:d.getFullYear(),
    products:pp,
    total:total()

  })
  .then(()=>{

    swal.fire({
      position:'center',
      icon:'success',
      title:'Purchase made successfully!',
      text:`Your purchase order is: ${order}`,
      showConfirmButton:true,
      timer:50000
    });
    $('.modal').modal('close');
    clean();
})


});
});