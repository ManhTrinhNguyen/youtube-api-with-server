$(document).ready(() => {
  
    const submitBtn = $(".submitBtn")
   
    // Fetch Data
 
    const fetchData = () => {
        
         let query = $("#searchInput").val()
         const data = {
            query : query, 
        }
         //const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&channelId=UCqZQlzSHbVJrwrn5XvzrzcA&maxResults=6&q=${query}`
         
         fetch('/', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              disPlayData(data)
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }

    // Click Submit Btn

   submitBtn.click((e) => {
    e.preventDefault()
    fetchData()
    $("#searchInput").val("")
   })


   // Element function 

   const getElement = (dataItems, arrIndice) => {
    console.log(dataItems)
            const img = dataItems[arrIndice].snippet.thumbnails.medium.url
            const title = dataItems[arrIndice].snippet.title
            const channelTitle = dataItems[arrIndice].snippet.channelTitle 
            const publishTime = dataItems[arrIndice].snippet.publishTime
            const videoID = dataItems[arrIndice].id.videoId

            $(`.video${arrIndice + 1}`).attr("href", `https://www.youtube.com/watch?v=${videoID}`)
            $(`.video${arrIndice + 1}`).attr("target", "_blank")
            $(`.img${arrIndice + 1}`).attr("src", img)
            $(`.title${arrIndice + 1}`).text(title)
            $(`.channel-title${arrIndice + 1}`).text(channelTitle)
            $(`.publish-time${arrIndice + 1}`).text(publishTime)
   }
   

   // display function
    const disPlayData = (data) => {
        const dataItems = data.items
        //console.log(dataItems)
        // Show result condition
        if(dataItems.length === 0) {
            $(".no-result-container").addClass("result-active")
            $(".video-container").removeClass("result-active-grid")
        }else {
            $(".video-container").addClass("result-active-grid")
            $(".no-result-container").removeClass("result-active")
        }

        for (let i = 0; i < 6 ; i++ ) {
            getElement(dataItems, i)
        }
    }
    
})