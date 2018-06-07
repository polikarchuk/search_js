'use strict';




function SORT_NAME_UP(a,b) {
    return (a.name < b.name) ? 1 : -1;

}
function SORT_NAME_DOWN(a,b) {
    return (a.name > b.name) ? 1 : -1;

}
function SORT_DATE_UP(a,b) {
    return (a.date < b.date) ? 1 : -1;

}
function SORT_DATE_DOWN(a,b) {
    return (a.date > b.date) ? 1 : -1;

}




    // modell
    var searchQuery = '';
    var dateFrom = getDefaultDateFrom(list);
    var dateTo = getDefaultDateTo(list);
    var sort_order;
    function getDefaultDateTo(arr) {
        return arr.reduce(function (acc,curr) {
            return (acc.date >= curr.date) ? acc : curr;
        }).date;

    }
    function getDefaultDateFrom(arr)       {
        return arr.reduce(function (acc,curr) {
            return (acc.date <= curr.date) ? acc : curr;
        }).date;

    }
    function sortList(arr) {
        return arr.filter(function (e) {
            return e.name.toLowerCase().includes(searchQuery.toLowerCase());
        }).filter(function (e) {
            return (e.date >= dateFrom && e.date <= dateTo)
        }).sort(sort_order)
    }

// controller
        var datepickerFrom = document.getElementById('start_date');
        var datepickerTo = document.getElementById('end_date');
        var search = document.getElementById('search');
        var byName = document.getElementById('name');
        var byDate = document.getElementById('date');



        byName.addEventListener("click",function (e) {
           var order = e.currentTarget.dataset.order;
           console.log(order);
            if(order === "down"){
               e.currentTarget.dataset.order = "up";
                sort_order = SORT_NAME_UP;
                renderList(sortList(list))
            }else {
                e.currentTarget.dataset.order = "down"
                sort_order = SORT_NAME_DOWN;
                renderList(sortList(list))
            }

        });


byDate.addEventListener("click",function (e) {
    var order = e.currentTarget.dataset.order;
    console.log(order);
    if(order === "down"){
        e.currentTarget.dataset.order = "up";
        sort_order = SORT_DATE_UP;
        renderList(sortList(list))
    }else {
        e.currentTarget.dataset.order = "down"
        sort_order = SORT_DATE_DOWN;
        renderList(sortList(list))
    }

});




    search.addEventListener('keyup',function (e) {
       searchQuery = e.target.value;
       renderList(sortList(list));
       console.log(sortList(list));

    });



    datepickerFrom.addEventListener('change',function (e) {
        dateFrom = (new Date(e.target.valueAsNumber || getDefaultDateFrom(list))).setHours(0);
        renderList(sortList(list));

    });
    datepickerTo.addEventListener('change',function (e) {
        dateTo = (new Date(e.target.valueAsNumber || getDefaultDateTo(list))).setHours(0);
        renderList(sortList(list));
        datepickerTo.addEventListener("change", function (e) {
            // dateFrom = (datepickerTo.valueAsNumber)? datepickerTo.valueAsNumber:getDefaultDateFrom();
        })
    });








function createItem(data) {
    var item = document.createElement('a');
    var description = document.createElement('p');
    var title = document.createElement('h4');
    var date = document.createElement('span');
    item.setAttribute('href', 'http://google.com');
    item.appendChild(description);
    item.appendChild(title);
    title.setAttribute('class', 'h4');
    title.innerHTML = data.name;
    description.setAttribute('class', 'list-p');
    description.innerHTML = data.description;
    item.appendChild(date);
    date.innerHTML = 'Date: '+ (new Date(data.date).toLocaleString('ru',{
        day: 'numeric',
        year:'numeric',
        month : 'long'
    }));
    date.setAttribute('class', 'label label-success ');

    date.className = (new Date()<= data.date)?'label label-info ':" label label-success ";


    return item


}

function createList(arr) {
    var list = document.createElement('div');
    list.setAttribute('class','list-group');
    for (var i = 0; i < arr.length; i++) {

        list.appendChild(createItem(arr[i]));
    }
    return list
}

list.forEach(function (e) {
    var parrent = document.querySelector('.list-group');
    parrent.appendChild(createList(list));
    // console.log(list);
});
function renderList(arr) {
    var n_list = createList(arr);
    var o_list = document.querySelector('div.list-group');
    o_list.parentElement.replaceChild(n_list,o_list);

}



createList(list);




