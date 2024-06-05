const eventList = document.getElementById('event-list');
const promiseList = document.getElementById('promise-list');
const eventTenSuKien = document.getElementById('tenSuKien');
const eventMoTa = document.getElementById('moTa');
const eventNgayBatDau = document.getElementById('ngayBatDau');
const eventId = document.getElementById('sukien-id');
const eventForm = document.getElementById('product-form');
const btn = document.getElementById('submit-btn');
const btnDelValue = document.getElementById('del-value-btn');
const btnSortDate = document.getElementById('btn-sort-date');
const btnTimKiem = document.getElementById('btn-search');
const msg400 = document.getElementById('msg400');
const msg200 = document.getElementById('msg200');
const msgxoa = document.getElementById('msgxoa');
const msgsua = document.getElementById('msgsua');




eventTenSuKien.value = 'về nhà';
eventMoTa.value = 'nấu cơm';
eventNgayBatDau.value = '2024-06-10';


let events = [];
function getEvent() {
    const data = [
        { id: 'bsc0c0tye', tenSuKien: 'đi chơi', moTa: 'với bạn', ngayBatDau: '2024-06-18' },
        { id: '7j0ufuwoh', tenSuKien: 'đi làm', moTa: 'đi làm 123', ngayBatDau: '2024-06-02' }
    ];

    events = data;
    console.log(events);
    displayEvent()

}


function displayEvent() {
    eventList.innerHTML = `
    <table>
    <thead>
        <tr>
            <th scope="col">Tên sự kiện</th>
            <th scope="col">Mô tả sự kiện</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Hành động</th>

        </tr>
    </thead>
        <tbody>
            ${events.map(eventmap => `
             <tr>
                <td>${eventmap.tenSuKien}</td>
                <td>${eventmap.moTa}</td>
                <td>${eventmap.ngayBatDau}</td>
                <td>
                    <button class="btn btn-danger btn-xoa" data-id="${eventmap.id}">xoá</button>

                    <button class="btn btn-info btn-edit" data-id="${eventmap.id}">sửa</button>

                    

                </td>
            </tr>
            `).join('')}
        </tbody>
    </table>
`;
}
eventForm.addEventListener('submit', event => {
    if (eventId.value) {

        const isConfirmed = confirm("Bạn có chắc chắn cập nhật sự kiện này không");
        if (isConfirmed) {
            updateEvent(event)
        } else {

        }


    } else {
        addEvent(event)

    }

})







eventList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-xoa')) {
        const isConfirmed = confirm("Bạn có chắc chắn muốn xóa sự kiện này không");
        if (isConfirmed) {
            deleteEvent(event)
        } else {
        }
    }
})
eventList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-edit')) {
        pastevent(event)
    }
})
function pastevent(event) {
    btn.textContent = "Cập Nhật"

    const eventID = event.target.dataset.id;

    const mEvent = events.find((item) => item.id == eventID)

    eventTenSuKien.value = mEvent.tenSuKien;
    eventMoTa.value = mEvent.moTa;
    eventNgayBatDau.value = mEvent.ngayBatDau;
    eventId.value = mEvent.id;

}



function addEvent(evnet) {
    event.preventDefault();


    if (!eventTenSuKien.value.trim() || !eventMoTa.value.trim() || !eventNgayBatDau.value.trim()) {

        controllerMSG('', 'Yêu Cầu Nhập đủ Các Trường')


    } else {
        const formattedDate = moment(eventNgayBatDau.value).format('YYYY-MM-DD');


        controllerMSG('Thêm Thành Công', '')

        var idrandom = Math.random().toString(36).substr(2, 9);

        const data = {
            id: idrandom,
            tenSuKien: eventTenSuKien.value,
            moTa: eventMoTa.value,
            ngayBatDau: formattedDate
        }

        events.push(data)
        // console.log(data);
        displayEvent()
    }


}
function deleteEvent(event) {
    const eventID = event.target.dataset.id;
    events = events.filter((item) => item.id != eventID)
    displayEvent()
    controllerMSG('Xóa thành công', '')

}
function updateEvent(event) {
    event.preventDefault();

    if (!eventTenSuKien.value.trim() || !eventMoTa.value.trim() || !eventNgayBatDau.value.trim()) {

        controllerMSG('', 'Yêu Cầu Nhập đủ Các Trường')


    } else {

        controllerMSG('Thêm Thành Công', '')



        const idEvent = document.getElementById('sukien-id').value;

        const objUpdate = events.find((item) => item.id == idEvent);
        console.log(`objUpdate ${objUpdate}`);


        if (!objUpdate) {

            controllerMSG('', 'Người dùng này đã được xóa')


        } else {
            objUpdate.tenSuKien = eventTenSuKien.value
            objUpdate.moTa = eventMoTa.value
            objUpdate.ngayBatDau = eventNgayBatDau.value
            displayEvent()
            controllerMSG('Cập Nhật Thành Công', '')

        }


    }

}
btnDelValue.addEventListener('click', function handleClick() {

    btn.textContent = "Thêm Mới"


    controllerMSG('', '')


    eventTenSuKien.value = '';
    eventMoTa.value = '';
    eventNgayBatDau.value = '';
    eventId.value = '';
})
btnSortDate.addEventListener('click', function handleClick() {

    events = events.sort((a, b) => convertToDate(a.ngayBatDau) - convertToDate(b.ngayBatDau));
    // console.log(1);
    displayEvent()


})
btnTimKiem.addEventListener('click', function handleClick() {

    const userInput = prompt("Tìm kiếm theo tên:");
    if (userInput !== null && userInput.trim() !== "") {


        events = events.filter((item) =>
            item.tenSuKien.toLowerCase().includes(userInput.toLowerCase()))

        displayEvent()

    } else {
        console.log("User cancelled the prompt.");
    }


})


function convertToDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}
function controllerMSG(m200, m400) {

    msg200.textContent = m200
    msg400.textContent = m400
}
getEvent()

let myPromise = new Promise(function (myResolve, myReject) {
    fetch('https://65dc5758e7edadead7ebaab5.mockapi.io/api/thithuPH20282')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            myResolve(data);
        })
        .catch(error => {
            myReject(error);
        });
});

myPromise.then(
    function (value) {
        console.log("Data loaded successfully:", value);
        controllerMSG(`${value.length}`, `${value.length}`)
        promiseList.innerHTML = `
    <table>
    <thead>
        <tr>
            <th scope="col">Ngày Tạo</th>
            <th scope="col">Tên đầy đủ</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ảnh</th>
        </tr>
    </thead>
        <tbody>
            ${value.map(promisemap => `
             <tr>
                <td>${promisemap.createdAt}</td>
                <td>${promisemap.fullname}</td>
                <td>${promisemap.phone}</td>
                <td>${promisemap.status}</td>
                <td><img src="${promisemap.image}" alt="" srcset=""></td>



            </tr>
            `).join('')}
        </tbody>
    </table>
`;


    },
    function (error) {
        console.log("Error loading data:", error);
    }
);



function createUser() {
    let createUserPromise = new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/api/users';

        for (let i = 0; i < 23000; i++) {


            var idrandom = Math.random().toString(36).substr(2, 9);
            var idrandom2 = Math.random().toString(36).substr(2, 9);
            var idrandom3 = Math.random().toString(36).substr(2, 9);
            var idrandom4 = Math.random().toString(36).substr(2, 9);

            const userData = {
                username: idrandom,
                email: idrandom2,
                fullname: idrandom3,
                password: idrandom4
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        }


    });

    createUserPromise
        .then(data => {
            console.log('Success:', data);
            displayResponse(data);
        })
        .catch(error => {
            console.error('Error:', error);
            displayResponse(error);
        });
}

// createUser()

























// // console.log('ES6  ================ let var const');

// var array = ['html', 'css', 'python', 'js', 'c'] // var biến global scope


// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
//     // console.log(element);

// }
// // console.log(i); //ReferenceError: i is not defined

// // const count = 4; // biến const không chỉnh sửa giá trị mặc định
// // count -= 2
// // console.log(count );

// // console.log('ES6  ================ template literal');

// const age = 21;
// const name = 'lâm'

// // console.log(`học sinh ${name} tuổi ${age}`); //dễ dàng sử dụng hơn ('abc' + name)

// // console.log('ES6  ================ object property');


// function obj(name, age, [...laptrinh], thethao, anuong, [...doibong]) {

//     function sothich(thethao, anuong) {
//         return {
//             thethao: thethao,
//             doibong: doibong,
//             anuong: anuong
//         }
//     }
//     var sothich = sothich(thethao, anuong);

//     var laptrinh = laptrinh

//     laptrinh.push('c#');

//     const objreturn = {
//         name,
//         age,
//         kynang: laptrinh,
//         sothich: sothich,

//     }
//     return objreturn

// }
// const chosename = {
//     name1: 'tùng',
//     name2: 'Lâmm'
// }
// const logobj = obj(
//     chosename.name2,
//     21,
//     ['ruby', 'golang', 'javascript'],
//     'bơi lội',
//     'ăn hạt tiêu',
//     ['mc', 'mu', 'liverpool']

// )
// // console.log(logobj);



// console.log('ES6  ================ object property'); 








