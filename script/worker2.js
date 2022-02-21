self.addEventListener('message', function (data) {
    console.log(data.data.id + ' ' + data.data.startDate)
    fetch(`https://www.nbrb.by/api/exrates/rates/${data.data.id}?ondate=${data.data.startDate}`)
        .then(response => response.json())
        .then(payload => ({
            msg: 'renderCurrent',
            payload,
        })
        )
        .then(postMessage)
})
