import booklists from "./bookList.js";
//already existed //
let $booksLength = booklists.length;
let $divMain = $('#main');
let $divItembox = $('#itembox');
let $divSelectbox = $('#selectbox');
let $charbox = $('#charbox');
let $pageBox = $('#pageBox');
let $indexPageBox = $('#indexpageBox');
let $indexListBox = $('#indexListBox');
let overTen = false;
let listTray = "";
let listTraySub = "";
//Making Pages//
function pleaseMakeList() {
    $booksLength = booklists.length;
    for (let i = 0; i < $booksLength; i++) {
        listTray += `<div id="page${i}">`;
        listTray += `<span class="photo">`
        listTray += `${booklists[i].photo}</span>`
        listTray += `<span class="subject">`
        listTray += `${booklists[i].subject}</span>`
        listTray += `<span class="author">`
        listTray += `${booklists[i].author}</span>`
        listTray += `<span class="publisher">`
        listTray += `${booklists[i].publisher}</span>`
        listTray += `<span class="date">`
        listTray += `${booklists[i].date}</span>`
        listTray += `<span class="price">`
        listTray += `${booklists[i].price}</span>`
        listTray += `<span class="summary">`
        listTray += `${booklists[i].summary}</span>`

        listTray += `</div>`
    }
    $pageBox.html(listTray);
    listTray = "";
}
pleaseMakeList();
//Making index page//
function pleaseMakeIndexList() {
    $booksLength = booklists.length;
    if ($booksLength > 10) {
        overTen = true;
    }
    else {
        overTen = false;
    }
    if (overTen == false) { //length under 10
        listTraySub += `<span class="indexList">1</span>`
        listTray += `<div id="indexPage1">`
        for (let i = 0; i < $booksLength; i++) {
            listTray += `<span class="imindex"> ${booklists[i].subject}`
            listTray += `<p>${i}</p>`
            listTray += `</span>`
        }
        listTray += `</div>`
    }
    else { //length over 10
        let listCountingArray = [];
        let $booksLengthTray = $booksLength;
        while ($booksLengthTray > 10) {
            listCountingArray.push(10);
            $booksLengthTray -= 10;
        }
        listCountingArray.push($booksLengthTray);
        for (let i = 0; i < listCountingArray.length; i++) {
            listTraySub += `<span class="indexList">${i + 1}</span>`
            listTray += `<div id="indexPage${i + 1}">`
            for (let j = 1; j <= listCountingArray[i]; j++) {
                listTray += `<span class="imindex">`
                listTray += `${booklists[(i * 10) + j - 1].subject}`
                listTray += `<p>${(i * 10) + j - 1}</p>`
                listTray += `</span>`
            }
            listTray += `</div>`
        }

    }
    $indexPageBox.html(listTray)
    $indexListBox.html(listTraySub)
    $('*').removeClass('view')
    $('#indexPage1').addClass('view')
    $indexPageBox.addClass('view')
    $indexListBox.addClass('view');
    $indexListBox.children().first().addClass('point').siblings().removeClass('point');
    listTray = "";
    listTraySub = "";

}
pleaseMakeIndexList()

//move index page
$(document).on("click", '.indexList', function () {
    let $indexPage = $('#indexpageBox>div')
    let num = $(this).index();
    $indexPageBox.addClass('view')
    $(this).addClass('point').siblings().removeClass('point');
    $indexPage.eq(num).addClass('view').siblings().removeClass('view');
    console.log(num)

})
//move to page from index
$(document).on("click", '.imindex', function () {
    $('*').removeClass('view')
    let num = $(this).children('p').text();
    $pageBox.addClass('view')
    $('#selectbox div:nth-child(3)').addClass('view')
    $(`#page${num}`).addClass('view')
    $('#charbox').addClass('coffee')

})
$(document).on("click", '#selectbox div', function () {
    let num = $(this).index();
    let numss = $('#pageBox div').filter('.view').index();
    switch (num) {
        case 0:
            $('*').removeClass('view coffee sung')
            $('#charbox').addClass('sung')
            $('.selectboxes').addClass('view')
            $('#EditBoxAdd').addClass('view')
            break;
        case 1:
            if (!$pageBox.hasClass('view')) {
                $('*').removeClass('view coffee sung')
                $('#charbox').addClass('sung')
                $('.selectboxes').addClass('view')
                $('#EditBoxDelete').addClass('view')
                pleaseMakeDeleteBox()
            }
            else {
                $('#yesorno').addClass('view')
            }
            break;
        case 2:
            if ($pageBox.hasClass('view')){
            $('*').removeClass('view coffee sung')
            $('#charbox').addClass('sung')
            $('.selectboxes').addClass('view')
            $('#EditBoxEdit').addClass('view')
            
            console.log(numss)
            pleaseMakeEditBox(numss)
        }
            break;
    }
})
//add
$(document).on("click", '#EditBoxAddButton', function () {
    let listTray = {
        subject: $('#bname').val(),
        author: $('#bauthor').val(),
        publisher: $('#bpublisher').val(),
        date: $('#bdate').val(),
        price: $('#bprice').val(),
        summary: $('#bsummary').val(),
        photo: $('#bphoto').val()
    }
    booklists.push(listTray);
    console.log(booklists)
    listTray = "";
    alert("추가완료")
    $('*').removeClass('view coffee sung')
    pleaseMakeList();
    pleaseMakeIndexList();
})
//delete
function pleaseMakeDeleteBox() {
    let listTray = "";


    for (let i = 0; i < $booksLength; i++) {
        listTray += `<option value="${i}">${booklists[i].subject}</option>`
    }


    $('#EditBoxDelete2').append(listTray)
    $('#EditBoxDelete').append("<span id='delspan'></span>")

}
$(document).on("change", "#EditBoxDelete2", function () {
    console.log("a")
    let num = $(this).val();
    console.log(num)
    let listTray = booklists[num].subject;
    console.log(listTray)
    $('#delspan').text(listTray);
    $('#delspan').removeClass();
    $('#delspan').addClass(num);


})
$(document).on("click", "#EditBoxDeleteButton", function () {
    let listTray = $('#delspan').text();
    let listTraySub = $('#delspan').attr('class')
    if (listTray !== "") {
        listTraySub = parseInt(listTraySub)
        booklists.splice(listTraySub, 1)
        alert("삭제완료")
        $('*').removeClass('view coffee sung')
        pleaseMakeList();
        pleaseMakeIndexList();
    }
    else {
        alert("삭제할 페이지를 선택해주세요")
    }

})
//onpage delete
$(document).on("click", '#yesorno div', function () {
    let num = $(this).index();
    switch (num) {
        case 0:
            let nums = $('#pageBox div').filter('.view').index();
            console.log(nums)
            booklists.splice(nums, 1)
            alert("삭제완료")
            $('*').removeClass('view coffee sung')
            pleaseMakeList();
            pleaseMakeIndexList();
            break;
        case 1:
            $('#yesorno').removeClass('view')
            break;
    }

})
//Edit page
function pleaseMakeEditBox(ele){
    
    // console.log(ele)
    let ename = booklists[ele].subject
    $('#ename').attr('value',ename);
    $('#eauthor').attr('value',(booklists[ele].author));
    $('#epublisher').attr('value',(booklists[ele].publisher));
    $('#edate').attr('value',(booklists[ele].date));
    $('#eprice').attr('value',(booklists[ele].price));
    $('#esummary').attr('value',(booklists[ele].summary));
    $('#ephoto').attr('value',(booklists[ele].photo));
    $(document).on("click", '#EditBoxEditButton', function () {
    let listTray = {
        subject: $('#ename').val(),
        author: $('#eauthor').val(),
        publisher: $('#epublisher').val(),
        date: $('#edate').val(),
        price: $('#eprice').val(),
        summary: $('#esummary').val(),
        photo: $('#ephoto').val()
    }
    booklists.splice(ele,1,listTray);
    console.log(booklists)
    listTray = "";
    
    $('*').removeClass('view coffee sung')
    pleaseMakeList();
    pleaseMakeIndexList();
    alert("수정완료")})

}
//big under
$(document).on("click", '#charbox', function () {
    $('*').removeClass('view coffee sung')
    pleaseMakeList();
    pleaseMakeIndexList();
})