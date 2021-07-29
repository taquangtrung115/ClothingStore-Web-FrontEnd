var DanhMucAPI = "http://localhost:3000/DanhMuc";

function start() {

    getDanhMucs(renderDanhMuc);
    handleCreateDanhMuc();
    handleUpdateCourse();

}


start();


// Function
function getDanhMucs(callBack) {
    fetch(DanhMucAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callBack);
}

function renderDanhMuc(DanhMucs) {
    var listDanhMuc = document.querySelector(".contianer__cart-table-heading--item--tbody");

    var html = DanhMucs.map(function (Danhmuc) {

        return `
   <tr>
   <td>${Danhmuc.id}</td>
   
   <td>${Danhmuc.tenDanhMuc}</td>
   <td class="contianer__cart-table-heading--item"><a  onclick="handleDeleteDanhMuc(${Danhmuc.id})"
                        class="container__cart-table-link--remove"><i class="far fa-trash-alt"></i></a></td>
   </tr>
 
  
    
 
    `;
    });

    listDanhMuc.innerHTML = html.join('');

}

function handleCreateDanhMuc() {
    var btnThem = document.querySelector('#btnThem_DM');

    btnThem.onclick = function () {


        var tenDanhMuc = document.querySelector('input[name="tenDanhMuc"]').value;

        var data_DM = {
            tenDanhMuc: tenDanhMuc
        };

        createDanhMuc(data_DM, function () {
            getDanhMucs(renderDanhMuc);
        });

    }
}

function createDanhMuc(data, callBack) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)

    };
    fetch(DanhMucAPI, options)
    then(function (response) {
            response.json();
        })
        .then(callBack);
}

function handleDeleteDanhMuc(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'

        },


    };
    fetch(DanhMucAPI + "/" + id, options)
    then(function (response) {
            response.json();
        })
        .then(function () {});
}
// Update
function updateCourse(id, data, callback) {
    var options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    };
    fetch(DanhMucAPI + "/" + id, options)
        .then(function (response) {
   return   response.json();
        })
        .then(callback)
       
        ;
        
}

function handleUpdateCourse() {
    var updateBtn = document.querySelector("#btnSua_DM");
    updateBtn.onclick = function () {

        var ma = document.querySelector('input[name="maDanhMuc"]').value;
        var ten = document.querySelector('input[name="tenDanhMuc"]').value;
        // Phải Truyền Đối Tượng Không Thì Lỗi 400 or 404
var data= {
    tenDanhMuc:ten
};
        updateCourse(ma, data, function () {
            getDanhMucs(renderDanhMuc);
        })


    };
}