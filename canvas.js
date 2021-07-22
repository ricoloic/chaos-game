const options = {
    '0': undefined,
    '1': 'not-same-as-prev'
};

const option = options[1];
const lerpAmount = 0.3;
const pointAmount = 10;
const randomPoints = false;
const itteration = 2000;
let maxSize;
let seedPoints = [];
let current;
let previous;

function setup() {
    maxSize = getMaxSize();
    setupCanvas(maxSize, maxSize);
    current = { x: random(width), y: random(height) };
    seedPoints = pickSeedPoints(randomPoints);
    background(30);
}

function draw() {
    stroke(100);
    strokeWeight(10);
    for (p of seedPoints)
        point(p.x, p.y);

    drawChaosPoints(option);
}

function drawChaosPoints(type = '') {
    function lerpCurrent(current, next) {
        current.x = lerp(next.x, current.x, lerpAmount);
        current.y = lerp(next.y, current.y, lerpAmount);
    }

    for (let i = 0; i < itteration; i++) {
        stroke(200, 20, 120);
        strokeWeight(1);
        point(current.x, current.y);

        let next = random(seedPoints);

        switch (type) {
            case '':
                lerpCurrent(current, next);
                break;
            case 'not-same-as-prev':
                if (next !== previous)
                    lerpCurrent(current, next);
                previous = next;
                break;
        }
    }
}

function pickSeedPoints(rando = false) {
    const radius = (maxSize / 2) - 10;
    let points = [];
    let point;

    function randomPoint() {
        const x = random(width);
        const y = random(height);
        return { x, y };
    }

    function pointInCircle(i) {
        const angle = i * TWO_PI / pointAmount;
        const x = radius * cos(angle) + width / 2;
        const y = radius * sin(angle) + height / 2;
        return { x, y };
    }

    for (let i = 0; i < pointAmount; i++) {
        if (rando) point = randomPoint();
        else point = pointInCircle(i);
        points.push(point);
    }
    return [...points];
}

function getMaxSize() {
    return (
        window.innerWidth >= window.innerHeight ?
            window.innerHeight :
            window.innerWidth
    );
}
