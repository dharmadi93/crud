


//ADD
$("button[name='createMemo']").on('click', function (e) {
    e.preventDefault()
    var title = $("input[name='title']").val()
    var description = $("input[name='description']").val()
    addMemoFromAPI(title, description)
    // console.log(title + " " + description)
})

function addMemoFromAPI(title, description) {
    $.ajax({
        url: "/api/createMemo",
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: title,
            description: description
        },
        success: function (memo) {
            console.log(memo);
            updateCreateMemo(memo.memo)
        }
    })
}

function updateCreateMemo(memo) {
    var html = `<tr id="row${memo.id}">
                    <td>
                        <h3>${memo.title}
                            <span class="pull-right">
                                <button id="${memo.id}" name="editMemo" class="btn btn-warning">Edit</button>
                                <button id="${memo.id}" name="deleteMemo" class="btn btn-danger pull-right">Delete</button>
                            </span>
                        </h3>
                    
                        <p>${memo.description}</p>
                    </td>
                 </tr>`
    $("tbody:last").append(html)
    $("input[name='title']").val("")
    $("input[name='description']").val("")
}

//GET ID FOR UPDATE

$(document).on('click', 'button[name="editMemo"]', function(e) {
    e.preventDefault()
    var id = this.id
    getUpdate(id)
})

function getUpdate(id) {
    // console.log(id)
    $.ajax({
        url: `/api/memo/${id}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id
        },
        success: function (memo) {
            // console.log(memo);
            getMemo(memo.memo)
        }
    })
}

function getMemo(memo) {
    // console.log(memo.title)
    var title = `input[name=title]`
    var description = `input[name=description]`
    $("form").find(title).val(memo.title)
    $("form").find(description).val(memo.description)
    $("form").find("button[name=createMemo]").replaceWith("<button type='submit' name='updateMemo' class='btn btn-default'>Update</button>")

    // console.log($("input[name='id']").val())
    var temp = $("input[name='id']").val()
    if ( typeof temp != "undefined") {
        $("input[name='id']").replaceWith(`<input type='hidden' class='form-control' name='id' value='${memo.id}'>`)
    }
    else {
        $(".form-group:first").append(`<input type='hidden' class='form-control' name='id' value='${memo.id}'>`)
    }
}


//UPDATE MEMO
// $("button[name='updateMemo']").on('click', function (e) {
//     e.preventDefault()
//     var id = $("input[name='id']").val()
//     var title = $("input[name='title']").val()
//     var description = $("input[name='description']").val()
//     updateMemoFromAPI(id, title, description)
//     // console.log(id + " " + title + " " + description)
//     // console.log("masuk")
// })

$(document).on('click', 'button[name="updateMemo"]', function(e) {
    e.preventDefault()
    var id = $("input[name='id']").val()
    var title = $("input[name='title']").val()
    var description = $("input[name='description']").val()
    updateMemoFromAPI(id, title, description)

});

function updateMemoFromAPI(id, title, description) {
    // console.log(id + " " + title + " " + description)
    $.ajax({
        url: "/api/updateMemo",
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id,
            title: title,
            description: description
        },
        success: function (memo) {
            // console.log(memo);
            updateUpdateMemo(memo.memo)
        }
    })
}

function updateUpdateMemo(memo) {
    // console.log(memo)
    var html = `<tr id="row${memo.id}">
                    <td>
                        <h3>${memo.title}
                            <span class="pull-right">
                                <button id="${memo.id}" name="editMemo" class="btn btn-warning">Edit</button>
                                <button id="${memo.id}" name="deleteMemo" class="btn btn-danger pull-right">Delete</button>
                            </span>
                        </h3>
                    
                        <p>${memo.description}</p>
                    </td>
                 </tr>`
    $("tbody").find(`#row${memo.id}`).replaceWith(html)

    $("form").find("button[name=updateMemo]").replaceWith("<button type='submit' name='createMemo' class='btn btn-default'>Create</button>")
    $("input[name='title']").val("")
    $("input[name='description']").val("")
}

//DELETE
$(document).on('click', 'button[name="deleteMemo"]', function (e) {
    e.preventDefault()
    var id = this.id
    var del = confirm("Are you sure you want to delete this memo?")
    // console.log(id);
    if (del) {
        deleteMemoFromAPI(id)
    }
})

function deleteMemoFromAPI(id) {
    // console.log(id);
    var temp = id
    // console.log(temp);
    $.ajax({
        url: "/api/deleteMemo",
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id
        },
        success: function () {
            // console.log(temp);
            updateDeleteMemo(temp)
        }
    })
}

function updateDeleteMemo(id) {
    $("tbody").find(`#row${id}`).remove()
    $("input[name='title']").val("")
    $("input[name='description']").val("")
}