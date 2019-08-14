function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function hexString(buffer) {
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, '0');
    return paddedHexCode;
  });

  return hexCodes.join('');
}

function getHash(message) {
  let encoder = new TextEncoder();
  let data = encoder.encode(message);

  return window.crypto.subtle.digest('SHA-1', data);
}

function getColor(hash) {
  return `#${hash.slice(-6)}`;
}

async function handleInput() {
  let input = document.getElementById('input').value;
  let hash = hexString(await getHash(input));

  let canvas = document.getElementById('canvas');
  canvas.height = 250;
  canvas.width = 250;

  let context = canvas.getContext('2d');
  let color = getColor(hash);
  let size = 250 / 5;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      context.fillStyle = 'white';

      context.moveTo(i + (j*size), (j+1) * size);
      let valueAtI = parseInt(hash.charAt(i*3 + (j > 2 ? (4 - j) : j)), 16);
      if (valueAtI % 2) {
        context.fillStyle = color;
      }

      context.fillRect(size * j, size * i, size, size);
      context.stroke();
    }
  }
}
