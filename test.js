const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

const raw = JSON.stringify({
  model: 'phi',
  messages: [
    {
      role: 'system',
      content: 'always respond 500 words',
    },
    {
      role: 'user',
      content: 'What is aeroplane',
    },
  ],
  stream: true,
})

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
}

let words = []

// Fetch the original data
fetch('http://localhost:8000/chat', requestOptions)
  // Retrieve its body as ReadableStream 
  .then((response) => {
    const reader = response.body.getReader()
    return new ReadableStream({
      start(controller) {
        return pump()
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close()
              return
            }
            // Decode the received chunk to text
            const text = new TextDecoder().decode(value)
            console.log(text)
            // Display the received text
            // console.log(JSON.parse(text).message.content);
            try {
              // Try parsing the received text as JSON
              const parsedData = JSON.parse(text)
              // If successful, push it to the words array
              words.push(parsedData.message.content)
            } catch (error) {
              // If parsing fails, log the error
              console.error('Error parsing JSON:', error)
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value)
            return pump()
          })
        }
      },
    })
  })
  // Create a new response out of the stream
  .then((stream) => new Response(stream))
  // Create an object URL for the response
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  // Use the streamed data
  .then((url) => console.log('Received streamed data:', words.join('')))
  .catch((err) => console.error(err))