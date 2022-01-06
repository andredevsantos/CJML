let touchpoints = []
let organizedTouchpoints = []
const touchpointContainer = document.querySelector('#touchpoint-container')

const updateTouchpointTitles = () => {
    const touchpointTitles = document.querySelectorAll('.touchpoint-title-span')
    let touchpointIndex = 1;
    touchpointTitles.forEach(title => {
        title.innerText = 'Touchpoint ' + touchpointIndex.toString()
        touchpointIndex++
    });
}


const createTouchpoint = () => {
    // Creates a new touchpoint object
    const touchpoint = {
        id: Math.floor(Math.random() * 10000),
        type: '',
        sender: '',
        receiver: '',
        channel: '',
        senderDescription: '',
        receiverDecription: '',
        time: null
    }

    // Adds new touchpoint to touchpoints array
    touchpoints.push(touchpoint);
    console.log("Created new touchpoint object");
    console.log(touchpoints)

    // Appends Add action and communication points button
    touchpointContainer.innerHTML += (createTouchpointElement(touchpoint))
    updateTouchpointTitles();
}

const createTouchpointElement = (touchpoint) => {
    return (`
    <div class="item" data-id="${touchpoint.id}">
        <div class="touchpoint-title">
            <button type="button" onclick='deleteButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-danger btn-sm border delete">
            ${deleteImg}
            </button>
            <span class="fw-bold touchpoint-title-span">Touchpoint:</span>
        </div>
        <div class="touchpoint-content" data-tc="${touchpoint.id}"></div>
        <div class="touchpointBtns">
            <button type="button" onclick='actionButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-primary actionBtn hide">Add action</button>
            <button type="button" onclick='communicationButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-primary communicationBtn hide">Add communication</button>
        </div>
    </div>`
    )
}

const createAction = (e) => {
    console.log('Created action')
    e.innerHTML += createActionElement();

    console.log('create actor list in action')
    const elementID = e.getAttribute('data-tc')
    e.firstElementChild.querySelector('.act_list').innerHTML = updateActors2Touchpoint(elementID)

    //test
    updateTouchpointSender()
    updateTouchpointSenderDescription()
    updateTouchpointTime()
}

const createActionElement = () => {
    console.log('Created action element')
    return (
        `<div class="actionContent">
        Action:<br>Who did this action? Please choose the initiator:<div class="act_list senders"></div>
        <br>Action Start Time:<br>
        <input type="datetime-local" class = "form-control date"/><br>
        <label for="action_des" class="form-label">Please describe this touchpoint within 50 characters.</label>
        <input type="text" class="form-control sender_des" name="action_des"></input>
        </div>`
    )
}

const createCommunicationPoint = (e) => {
    // console.log('Created Comminication')
    // console.log(e)
    e.innerHTML += createCommunicationPointElement();

    console.log('create actor list in communication')
    const elementID = e.getAttribute('data-tc')
    e.firstElementChild.querySelector('.sender_list').innerHTML = updateActors2Touchpoint(elementID)
    const elementIdPlus = elementID + 1
    e.firstElementChild.querySelector('.recevier_list').innerHTML = updateActors2Touchpoint(elementIdPlus)
    updateTouchpointSender()
    updateTouchpointReciver()
    updateTouchpointChannel()
    updateTouchpointSenderDescription()
    updateTouchpointReceiverDescription()
    updateTouchpointTime()
}

const createCommunicationPointElement = () => {
    console.log('Created communication element')
    return (
        `<div class="communicationContent">
    Communication Point:<br>
    Who started this event? Please choose the initiator:<div class="sender_list senders"></div><br>
    Please choose the communication method.<br>
    <input name = "channel" class="form-control channel" list="channel" placeholder ="Select Method..." required><br>
        <datalist id="channel">
            <option value="SMS">
            <option value="Email">
            <option value="Telephone conversation">
            <option value="Face-to-Face">
            <option value="Website">
            <option value="Letter">
            <option value="Payment">
            <option value="Self-service machine">
        </datalist>
    Please choose the other participant (Receiver)<br><div class="recevier_list receivers"></div><br>
    Communication Start Time:<br>
    <input type="datetime-local" class = "form-control date"/><br>
    <label for="sender_describe" class="form-label">Please describe senders action within 50 characters.</label>
    <input type="text" class="form-control sender_des" name="sender_describe">
    <label for="receiver_describe" class="form-label">Please describe receiver action within 50 characters.</label>
    <input type="text" class="form-control receiver_des" name="receiver_describe">
    </div>
    `
    )
}

const actionButtonHandler = (e) => {
    const elementID = e.getAttribute('data-id')
    // console.log('Clicked action button with id: ' + elementID)
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return (touchpoint.id == elementID)
    })
    filteredTouchpoints[0].type = 'action'
    createAction(document.querySelector(`[data-tc="${elementID}"]`))
    e.parentNode.remove()
}

const communicationButtonHandler = (e) => {
    const elementID = e.getAttribute('data-id')
    // console.log('Clicked communication button with id: ' + e.getAttribute('data-id'))
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return (touchpoint.id == e.getAttribute('data-id'))
    })
    filteredTouchpoints[0].type = 'communication'
    createCommunicationPoint(document.querySelector(`[data-tc="${elementID}"]`))
    e.parentNode.remove()
}

const deleteButtonHandler = (e) => {
    // console.log('Deleted touchpoint with id: ' + e.getAttribute('data-id'))
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return !(touchpoint.id == e.getAttribute('data-id'))
    })
    e.closest('.item').remove()
    touchpoints = filteredTouchpoints;
    updateTouchpointTitles();
}

const updateActors2Touchpoint = (touchpointId) => {
    let actorList = ''
    actors.forEach((actor) => {
        const actorElement = `<div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="${touchpointId}" value="${actor.name}">
        <label class="form-check-label" >${actor.name}</label>
        </div>`
        actorList += actorElement
    })
    return actorList
}

const updateTouchpointSender = () => {
    const inputs = document.querySelectorAll('.senders')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].sender = e.target.value
            console.log(touchpoints)
        })
    })
}

const updateTouchpointReciver = () => {
    const inputs = document.querySelectorAll('.receivers')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].receiver = e.target.value
            console.log(touchpoints)
        })
    })
}

const updateTouchpointChannel = () => {
    const inputs = document.querySelectorAll('.channel')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].channel = e.target.value
            console.log(touchpoints)
        })
    })
}
const updateTouchpointSenderDescription = () => {
    const inputs = document.querySelectorAll('.sender_des')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].senderDescription = e.target.value
            console.log(touchpoints)
        })
    })
}
const updateTouchpointReceiverDescription = () => {
    const inputs = document.querySelectorAll('.receiver_des')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].receiverDecription = e.target.value
            console.log(touchpoints)
        })
    })
}
const updateTouchpointTime = () => {
    const inputs = document.querySelectorAll('.date')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].time = e.target.value
            console.log(touchpoints)
        })
    })
}

const selectedObject = (e) => {
    const id = e.target.closest('.item').getAttribute('data-id')
    const currentTouchpoint = touchpoints.filter((touchpoint) => {
        return touchpoint.id == id
    })
    return currentTouchpoint
}

// // render form
// const renderForm = () => {
//     actorContainer.innerHTML = ''
//     touchpointContainer.innerHTML = ''
//     let indexActor = 0
//     let indexTouch = 0

//     actors.forEach((actor) => {
//         printActor(actor, indexActor)
//         indexActor++

//     })

//     touchpoints.forEach((touchpoint) => {
//         console.log('1')
//         console.log(touchpoint)
//         if (touchpoint.type == 'action') {
//             printAction(touchpoint.id)
//             console.log('2')
//         } else if (touchpoint.type == 'communication') {

//         } else {
//             printTouchpoint(touchpoint, indexTouch)
//         }

//         indexTouch++
//     })

//     generateDeleteButtons()
//     updateActorNameOnInput()
//     updateActorRoleOnInput()
//     addAction()

// }
// renderForm()