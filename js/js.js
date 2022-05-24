let ddlcategory=document.getElementById('ddlcategory');
let Category=document.getElementById('Category');
let product=document.getElementById('product');
let quantity=document.getElementById('quantity');
let Price=document.getElementById('Price');
let Discount=document.getElementById('Discount');
let Total=document.getElementById('Total');

let CategoryArray;
let ProductArray;
let btnStatus="Create";
let ProId;

localStorage.Category!=null?CategoryArray=JSON.parse(localStorage.Category):CategoryArray=[];
localStorage.product!=null?ProductArray=JSON.parse(localStorage.product):ProductArray=[];

//SaveCategory
function SaveCategory(){
    let ObjCategory={
        Category: Category.value
    };
  CategoryArray.push(ObjCategory);
  localStorage.setItem('Category',JSON.stringify(CategoryArray));
  Rest();
  ShowCategory();
  ShowTableCategory();
  CountCategory();
}

//Rest
function Rest(){
    Category.value='';
}
//ShowCategory
function ShowCategory(){
    let item='';
    item += `<option value="">Select Category .......</option>`
   for(let i=0;i<CategoryArray.length;i++){
   item +=`<option value="${i}">${CategoryArray[i].Category}</option>`
}
   ddlcategory.innerHTML=item;
}
//show Table category
function ShowTableCategory(){

    let Table='';

    for(let i=0;i<CategoryArray.length;i++){
        Table+=`
        <tr>
        <td>${i}</td>
        <td>${CategoryArray[i].Category}</td>
        
        <td>
            
            <button class="btn btn-danger" onclick="DeleteCategory(${i})">
                <i class="fa fa-calendar-minus"></i>
            </button>
        </td>
    
    </tr>    
        
        `;
    }
    document.getElementById('bodycategory').innerHTML=Table;
}

//Delete Category
function DeleteCategory(id){
   if(confirm("Are you sure for Deleted .....?")==true){
    CategoryArray.splice(id,1);
    localStorage.Category=JSON.stringify(CategoryArray);
    ShowTableCategory();
    ShowCategory();
    CountCategory();
}
}

//Count Category

function CountCategory(){
    document.getElementById('countCategory').innerHTML=`- total Category (${CategoryArray.length})`;
}

//Validation Category
 function ValidationCategory(){
     let valid=true;
     if(Category.value ==''){
         alert('Enter Name of Category....');
         valid=false;
     }
     else{
         SaveCategory();
         valid=true;
     }
     return valid;
 }

 /////////Product///////////

 //Get Total
 function GetTotal(){
     if(Price.value!=0){
         let total=(Price.value*quantity.value)-Discount.value;
         Total.value=total;
         Total.className.replace="form-control bg-danger text-center";
         Total.className="form-control bg-info text-center";

     }else{
         Total.value=0;
        Total.className.replace="form-control bg-info text-center";
        Total.className="form-control bg-danger text-center";

     }
 }

 //Save Product
 function SaveProduct(){
     let=Newproduct={
         ddlcategory:ddlcategory.options[ddlcategory.selectedIndex].text,
         product:product.value,
         quantity:quantity.value,
         Price:Price.value,
         Discount:Discount.value,
         Total:Total.value
     }
     if(btnStatus=="Create"){
        ProductArray.push(Newproduct);

     }else{
      ProductArray[ProId]=Newproduct;
      document.getElementById('btnSave').className.replace='btn btn-info w-25';
    document.getElementById('btnSave').className='btn btn-success w-25';
     }
     localStorage.setItem("product",JSON.stringify(ProductArray));
     Rest()
     ShowTableProduct();
     CountProduct();

 }

// Rest
function Rest(){
    ddlcategory.options[ddlcategory.selectedIndex].text='Select Category ......';
    product.value='';
    quantity.value='0';
    Price.value='0';
    Discount.value='0';
    Total.value='0';
    Total.className.replace="form-control bg-info text-center";
    Total.className="form-control bg-danger text-center";
    document.getElementById('btnSave').className.replace='btn btn-info w-25';
    document.getElementById('btnSave').className='btn btn-success w-25';

}

//Show Table Product
function ShowTableProduct(){
    let tableprod='';
    for(let i=0;i<ProductArray.length;i++){
        tableprod +=`
        <tr>
        <td>${i}</td>
        <td>${ProductArray[i].ddlcategory}</td>
        <td>${ProductArray[i].product}</td>
        <td>${ProductArray[i].quantity}</td>
        <td>${ProductArray[i].Price}</td>
        <td>${ProductArray[i].Discount}</td>
        <td>${ProductArray[i].Total}</td>
        <td>
            <button class="btn btn-info" onclick="EditProduct(${i})">
                <i class="fa fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger" onclick="DeleteProduct(${i})">
                <i class="fa fa-calendar-minus"></i>
            </button>
        </td>
    
    </tr>
        `;
    }
    document.getElementById('tablepro').innerHTML=tableprod;
}

//delete Product
function DeleteProduct(id){

    if(confirm('Are you Sure From Deleted....?')==true){
        ProductArray.splice(id,1);
        localStorage.product=JSON.stringify(ProductArray);
        ShowTableProduct();
         CountProduct();

    }
   
}

//Edit Product
function EditProduct(id){
    ddlcategory.options[ddlcategory.selectedIndex].text=ProductArray[id].ddlcategory;
    product.value=ProductArray[id].product;
    quantity.value=ProductArray[id].quantity;
    Price.value=ProductArray[id].Price;
    Discount.value=ProductArray[id].Discount;
    Total.value=ProductArray[id].Total;
    btnStatus="Edit";
    ProId=id;
   
    document.getElementById('btnSave').className.replace='btn btn-success w-25';
    document.getElementById('btnSave').className='btn btn-info w-25';

}
 
//Count Product
function CountProduct(){
    document.getElementById('CountProd').innerHTML=`- Total Product (${ProductArray.length})`;
}

//Validation Product
function ValidationProduct(){
    let lbcate=document.getElementById('lbcate');
    let lbpro=document.getElementById('lbpro');
    let lbquantity=document.getElementById('lbquantity');
    let lbprice=document.getElementById('lbprice');

    let valid=true;

    if(ddlcategory.options[ddlcategory.selectedIndex].text=='Select Category .......'){
        lbcate.innerHTML='Caregory : *[Required]';
        lbcate.style.color='red';
        valid=false;
    }else{
        lbcate.innerHTML=`Caregory : *`;
        lbcate.style.color=`white`;
        valid=true;
    }
    if(product.value==''){
        lbpro.innerHTML='Product Name : *[Required]';
        lbpro.style.color='red';
        valid=false;
    }else{
        lbpro.innerHTML='Product Name : *';
        lbpro.style.color='white';
        valid=true;
    }
     if(quantity.value==0){
        lbquantity.innerHTML='Quantity:*[Required]';
        lbquantity.style.color='red';
        valid=false;
    }else{
        lbquantity.innerHTML='Quantity :  *';
        lbquantity.style.color='white';
        valid=true;
    
     }
     if(Price.value==0){
        lbprice.innerHTML='Price  : *[Required]';
        lbprice.style.color='red';
        valid=false;
    }else{
        lbprice.innerHTML='Price : *';
        lbprice.style.color='white';
        valid=true;
       
    }
    if(ddlcategory.options[ddlcategory.selectedIndex].text!=''&& product.value!='' &&
    quantity.value!=0 && Price.value!=0){
        SaveProduct();
    }
 return valid;
}




$(document).ready( function () {
    ShowCategory();
    ShowTableCategory();
    CountCategory();
    ShowTableProduct();
    CountProduct();
    $('#tableprod').DataTable();
} );