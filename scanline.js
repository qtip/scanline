"use strict";

//============ Matrix class ==============

function Matrix() {
    this[0] = [1, 0, 0, 0];
    this[1] = [0, 1, 0, 0];
    this[2] = [0, 0, 1, 0];
    this[3] = [0, 0, 0, 1];
}

Matrix.prototype.clone = function () {
    var matrix = new Matrix();
    matrix[0] = this[0].slice();
    matrix[1] = this[1].slice();
    matrix[2] = this[2].slice();
    matrix[3] = this[3].slice();
    return matrix;
};

Matrix.prototype.mult = function(rhs) {
    if ('x' in rhs) {
        return this.multVertex(rhs);
    } else {
        return this.multMatrix(rhs);
    }
};

Matrix.prototype.multMatrix = function(rhs) {
    var product = new Matrix();
    product[0][0] = this[0][0] * rhs[0][0] + this[0][1] * rhs[1][0] + this[0][2] * rhs[2][0] + this[0][3] * rhs[3][0];
    product[1][0] = this[1][0] * rhs[0][0] + this[1][1] * rhs[1][0] + this[1][2] * rhs[2][0] + this[1][3] * rhs[3][0];
    product[2][0] = this[2][0] * rhs[0][0] + this[2][1] * rhs[1][0] + this[2][2] * rhs[2][0] + this[2][3] * rhs[3][0];
    product[3][0] = this[3][0] * rhs[0][0] + this[3][1] * rhs[1][0] + this[3][2] * rhs[2][0] + this[3][3] * rhs[3][0];
    product[0][1] = this[0][0] * rhs[0][1] + this[0][1] * rhs[1][1] + this[0][2] * rhs[2][1] + this[0][3] * rhs[3][1];
    product[1][1] = this[1][0] * rhs[0][1] + this[1][1] * rhs[1][1] + this[1][2] * rhs[2][1] + this[1][3] * rhs[3][1];
    product[2][1] = this[2][0] * rhs[0][1] + this[2][1] * rhs[1][1] + this[2][2] * rhs[2][1] + this[2][3] * rhs[3][1];
    product[3][1] = this[3][0] * rhs[0][1] + this[3][1] * rhs[1][1] + this[3][2] * rhs[2][1] + this[3][3] * rhs[3][1];
    product[0][2] = this[0][0] * rhs[0][2] + this[0][1] * rhs[1][2] + this[0][2] * rhs[2][2] + this[0][3] * rhs[3][2];
    product[1][2] = this[1][0] * rhs[0][2] + this[1][1] * rhs[1][2] + this[1][2] * rhs[2][2] + this[1][3] * rhs[3][2];
    product[2][2] = this[2][0] * rhs[0][2] + this[2][1] * rhs[1][2] + this[2][2] * rhs[2][2] + this[2][3] * rhs[3][2];
    product[3][2] = this[3][0] * rhs[0][2] + this[3][1] * rhs[1][2] + this[3][2] * rhs[2][2] + this[3][3] * rhs[3][2];
    product[0][3] = this[0][0] * rhs[0][3] + this[0][1] * rhs[1][3] + this[0][2] * rhs[2][3] + this[0][3] * rhs[3][3];
    product[1][3] = this[1][0] * rhs[0][3] + this[1][1] * rhs[1][3] + this[1][2] * rhs[2][3] + this[1][3] * rhs[3][3];
    product[2][3] = this[2][0] * rhs[0][3] + this[2][1] * rhs[1][3] + this[2][2] * rhs[2][3] + this[2][3] * rhs[3][3];
    product[3][3] = this[3][0] * rhs[0][3] + this[3][1] * rhs[1][3] + this[3][2] * rhs[2][3] + this[3][3] * rhs[3][3];
    return product;
};

Matrix.prototype.multVertex = function(rhs) {
    var product = rhs.clone();
    product.x = this[0][0] * rhs.x + this[0][1] * rhs.y + this[0][2] * rhs.z + this[0][3] * rhs.w;
    product.y = this[1][0] * rhs.x + this[1][1] * rhs.y + this[1][2] * rhs.z + this[1][3] * rhs.w;
    product.z = this[2][0] * rhs.x + this[2][1] * rhs.y + this[2][2] * rhs.z + this[2][3] * rhs.w;
    product.w = this[3][0] * rhs.x + this[3][1] * rhs.y + this[3][2] * rhs.z + this[3][3] * rhs.w;
    return product;
};

function identityMatrix() {
    var matrix = new Matrix();
    matrix[0] = [1, 0, 0, 0];
    matrix[1] = [0, 1, 0, 0];
    matrix[2] = [0, 0, 1, 0];
    matrix[3] = [0, 0, 0, 1];
    return matrix;
}

function perspectiveMatrix(fovY, aspect, zNear, zFar) {
    var matrix = new Matrix();
    var d = 1.0 / Math.tan(fovY / 2.0);
    matrix[0] = [d / aspect, 0, 0,                              0];
    matrix[1] = [0,          d, 0,                              0];
    matrix[2] = [0,          0, zFar / (zFar - zNear),           -zNear * zFar / (zFar - zNear)];
    matrix[3] = [0,          0,1, 0];
    return matrix;
}

function rotationMatrix(angle, x, y, z) {
    var matrix = new Matrix();
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    matrix[0] = [x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, 0];
    matrix[1] = [y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, 0];
    matrix[2] = [x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c, 0];
    matrix[3] = [0, 0, 0, 1];
    return matrix;
}

function translationMatrix(x, y, z) {
    var matrix = new Matrix();
    matrix[0] = [1, 0, 0, x];
    matrix[1] = [0, 1, 0, y];
    matrix[2] = [0, 0, 1, z];
    matrix[3] = [0, 0, 0, 1];
    return matrix;
}

function scaleMatrix(x, y, z) {
    var matrix = new Matrix();
    matrix[0] = [x, 0, 0, 0];
    matrix[1] = [0, y, 0, 0];
    matrix[2] = [0, 0, z, 0];
    matrix[3] = [0, 0, 0, 1];
    return matrix;
}

function windowMatrix(w, h) {
    var matrix = new Matrix();
    matrix[0] = [w / 2, 0, 0, w / 2];
    matrix[1] = [0, -h / 2, 0, h / 2];
    matrix[2] = [0, 0, 1, 0];
    matrix[3] = [0, 0, 0, 1];
    return matrix;
}

//============ Vertex class ==============

function Vertex(x, y, z, w, data) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.data = {};
    var dataKey;
    for (dataKey in data) {
        if (data.hasOwnProperty(dataKey)) {
            this.data[dataKey] = data[dataKey];
        }
    }
}

Vertex.prototype.clone = function() {
    return new Vertex(this.x, this.y, this.z, this.w, this.data);
};

Vertex.prototype.unhomogenized = function() {
    var vertex = this.clone();
    // Storing the old w value because it's needed for perspective-correct attribute mapping.
    vertex.data.oldW = this.w;
    // Z division occurs here
    vertex.x /= this.w;
    vertex.y /= this.w;
    vertex.z /= this.w;
    vertex.w = 1;
    return vertex;
};

Vertex.prototype.normalized = function() {
    var mag = this.dist();
    var vertex = this.clone();
    vertex.x = this.x/mag;
    vertex.y = this.y/mag;
    vertex.z = this.z/mag;
    return vertex;
};

Vertex.prototype.dot = function(rhs) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
};

Vertex.prototype.cross = function(rhs) {
    return new Vertex(-this.z*rhs.y + this.y*rhs.z, this.z*rhs.x - this.x*rhs.z, -this.y*rhs.x + this.x*rhs.y, 1);
}

Vertex.prototype.sub = function(rhs) {
    var vertex = this.clone();
    vertex.x -= rhs.x;
    vertex.y -= rhs.y;
    vertex.z -= rhs.z;
    return vertex;
}

Vertex.prototype.dist = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
}

Vertex.prototype.mult = function(rhs) {
    var product = this.clone();
    product.x = this.x * rhs[0][0] + this.y * rhs[1][0] + this.z * rhs[2][0] + this.w * rhs[3][0];
    product.y = this.x * rhs[0][1] + this.y * rhs[1][1] + this.z * rhs[2][1] + this.w * rhs[3][1];
    product.z = this.x * rhs[0][2] + this.y * rhs[1][2] + this.z * rhs[2][2] + this.w * rhs[3][2];
    product.w = this.x * rhs[0][3] + this.y * rhs[1][3] + this.z * rhs[2][3] + this.w * rhs[3][3];
    return product;
};

Vertex.prototype.multScalar = function(value) {
    var product = this.clone();
    product.x *= value;
    product.y *= value;
    product.z *= value;
    product.w *= value;
    return product;
};

Vertex.prototype.interpolated = function(goal, ratio) {
    function linearInterpolation(start, end, ratio) {
        return (1-ratio)*start + ratio*end;
    }
    function perspectiveInterpolation(start, end, ratio, wStart, wEnd) {
        var numerator = (1-ratio)*start/wStart + ratio*end/wEnd;
        var denominator = (1-ratio)/wStart + ratio/wEnd;
        return numerator/denominator;
    }
    if (isFinite(ratio)){
        ratio = Math.max(0, Math.min(ratio, 1));
    } else {
        ratio = 0.5;
    }
    var vertex = new Vertex(0, 0, 0, 1, {});
    vertex.x = linearInterpolation(this.x, goal.x, ratio);
    vertex.y = linearInterpolation(this.y, goal.y, ratio);
    vertex.z = linearInterpolation(this.z, goal.z, ratio);
    vertex.w = linearInterpolation(this.w, goal.w, ratio);
    function copyData(){
        return 12;
    }
    var dataKey;
    for (dataKey in this.data) {
        if (this.data.hasOwnProperty(dataKey)) {
            if (this.data[dataKey] instanceof Object){
                // Data is an object.
                // TODO: recursive data
            } else {
                // Data is just data. Interpolate it.
                vertex.data[dataKey] = perspectiveInterpolation(this.data[dataKey], goal.data[dataKey], ratio, this.data.oldW, goal.data.oldW);
            }
        }
    }
    return vertex;

};

Vertex.prototype.reflected = function(normal){
    return normal.multScalar(2*this.dot(normal)).sub(this).normalized();
}

//============ Polygon class ==============

function Polygon(vertices, lowerBoundY, upperBoundY){
    if (vertices.length < 3) {
        throw new Error("Polygon constructor requires at least 3 vertices. Given " + arguments.length + ".");
    }
    this.vertices = [];

    // Clone vertices and round Y values to integers.
    var vertexIndex;
    for (vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
        var vertex = vertices[vertexIndex];
        this.vertices[vertexIndex] = new Vertex(vertex.x, Math.round(vertex.y), vertex.z, vertex.w, vertex.data);
    }

    // Figure out top and bottom of the polygon.
    this.minY = Infinity;
    this.maxY = -Infinity;
    for (vertexIndex = 0; vertexIndex < this.vertices.length; vertexIndex++) {
        var vertex = this.vertices[vertexIndex];
        this.minY = Math.max(Math.min(this.minY, vertex.y), lowerBoundY);
        this.maxY = Math.min(Math.max(this.maxY, vertex.y), upperBoundY);
    }

    // Create all the scanlines.
    this.scanlines = [];
    for (vertexIndex = 0; vertexIndex < this.vertices.length; vertexIndex++) {
        var vertex1 = this.vertices[vertexIndex];
        var vertex2 = this.vertices[(vertexIndex + 1) % this.vertices.length];
        this.makeScanlinesFromLine(vertex1, vertex2);
    }
}

Polygon.prototype.makeScanlinesFromLine = function(vertex1, vertex2) {
    // Flip vertices so that vertex1.y < vertex2.y.
    if (vertex1.y > vertex2.y) {
        var tempVertex = vertex2;
        vertex2 = vertex1;
        vertex1 = tempVertex;
    }

    // Loop through each y value in order for this line.
    var y;
    for (y = vertex1.y; y <= vertex2.y; y++) {
        // Figure out how far along the line we've moved for each scanline.
        var ratio = (y - vertex1.y) / (vertex2.y - vertex1.y);
        // Find the new interpolated vertex.
        var interpolated = vertex1.interpolated(vertex2, ratio);

        // Set the scanline left or right according to this line.
        if (this.scanlines[y] === undefined) {
            this.scanlines[y] = {
                left: interpolated.clone(),
                right: interpolated.clone()
            };
        } else {
            if (interpolated.x < this.scanlines[y].left.x) {
                this.scanlines[y].left = interpolated.clone();
            }
            if (interpolated.x > this.scanlines[y].right.x) {
                this.scanlines[y].right = interpolated.clone();
            }
        }
    }
};

//============ Texture class ==============

function Texture(src, onload) {
    this.onload = onload;
    this.image = new Image();
    this.image.src = src;
    this.canvas = document.createElement("canvas");
    this.ctx = null;
    var texture = this;
    this.image.onload = function(){
        texture.width = texture.image.width;
        texture.height = texture.image.height;
        texture.canvas.width = texture.image.width;
        texture.canvas.height = texture.image.height;
        texture.ctx = texture.canvas.getContext('2d');
        texture.ctx.drawImage(texture.image, 0, 0);
        texture.imageData = texture.ctx.getImageData(0,0,texture.width, texture.height);
        texture.pixels = texture.imageData.data;
        if(texture.onload instanceof Function){
            texture.onload(texture);
        }
    }
}

Texture.prototype.getPixel = function(x,y){
    x *= this.width;
    y *= this.height;
    var index = (Math.floor(x) + Math.floor(y) * this.width) * 4;
    var color = {};
    color.r =  this.pixels[index];
    color.g =  this.pixels[index + 1];
    color.b =  this.pixels[index + 2];
    color.a =  this.pixels[index + 3];
    return color;
};

function loadMultipleTextures(srcs, onload){
    var stillWaiting = srcs.length;
    var textures = [];
    function textureLoaded(){
        if (--stillWaiting <= 0){
            onload(textures);
        }
    };
    var i;
    for (i=0; i < srcs.length; i++){
        textures[i] = new Texture(srcs[i], textureLoaded);
    }
}

function getTextureCubePixel(vector, posx, negx, posy, negy, posz, negz){
    var cubeTexture;
    var biggestComponent = Math.max(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));
    if (Math.abs(vector.x) == biggestComponent){
        var u = -vector.z/Math.abs(vector.x);
        var v = -vector.y/Math.abs(vector.x);
        if (vector.x >= 0){
            cubeTexture = posx;
        } else {
            cubeTexture = negx;
        }
    } else if (Math.abs(vector.y) == biggestComponent){
        var u = -vector.x/Math.abs(vector.y);
        var v = -vector.z/Math.abs(vector.y); 
        cubeTexture = negy;
        if (vector.y >= 0){
            cubeTexture = posy;
        } else {
            cubeTexture = negy;
        }
    } else {
        var u = -vector.x/Math.abs(vector.z);
        var v = -vector.y/Math.abs(vector.z); 
        cubeTexture = negz;
        if (vector.z >= 0){
            cubeTexture = posz;
        } else {
            cubeTexture = negz;
        }
    }
    var u = Math.abs(1+u)/2;
    var v = Math.abs(1+v)/2;
    return cubeTexture.getPixel(u, v);
    
};


//============ Surface class ==============

function Surface(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    this.pixels = this.imageData.data;
    this.zBuffer = [];
}

Surface.prototype.show = function() {
    this.ctx.putImageData(this.imageData, 0, 0);
};

Surface.prototype.drawPixel = function(x, y, r, g, b) {
    if ((0 <= x && x <= this.width) && (0 <= y && y <= this.height)) {
        var index = (Math.round(x) + Math.round(y) * this.width) * 4;
        this.pixels[index] = r;
        this.pixels[index + 1] = g;
        this.pixels[index + 2] = b;
        this.pixels[index + 3] = 255;
    }
};

Surface.prototype.drawDepthPixel = function(x, y, z, r, g, b) {
    if ((0 <= x && x <= this.width) && (0 <= y && y <= this.height)) {
        var zindex = Math.round(x) + Math.round(y) * this.width;
        var zBuffervalue = this.zBuffer[zindex];
        if (0 <= z && (z < zBuffervalue || zBuffervalue === undefined)) {
            this.zBuffer[zindex] = z;
            this.drawPixel(x, y, r, g, b);
        } else {
            // This pixel goes behind what's already there so don't draw it.
        }
    }
};

Surface.prototype.drawScanline = function(leftVertex, rightVertex, uniform, fragmentShader) {
    leftVertex = new Vertex(Math.round(leftVertex.x), leftVertex.y, leftVertex.z, leftVertex.w, leftVertex.data);
    rightVertex = new Vertex(Math.round(rightVertex.x), rightVertex.y, rightVertex.z, rightVertex.w, rightVertex.data);
    var x;
    if (leftVertex.x < rightVertex.x) {
        for (x = Math.max(leftVertex.x, 0); x <= Math.min(rightVertex.x, this.width); x++) {
            var interpolated = leftVertex.interpolated(rightVertex, (x - leftVertex.x) / (rightVertex.x - leftVertex.x));
            var color = fragmentShader(interpolated, uniform);
            this.drawDepthPixel(x, leftVertex.y, interpolated.z, color.r, color.g, color.b);
        }
    }
};

Surface.prototype.drawPolygon = function(vertices, uniform, vertexShader, fragmentShader) {
    if (vertices.length < 3) {
        throw new Error("drawPolygon method requires at least 3 vertices. Given " + Math.max(0, vertices.length) + ".");
    }
    // Transform each vertex.
    var windowmatrix = windowMatrix(this.width, this.height);

    var vertexIndex;
    for (vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
        vertices[vertexIndex] = vertexShader(vertices[vertexIndex], uniform);
        vertices[vertexIndex] = windowmatrix.mult(vertices[vertexIndex]);
        vertices[vertexIndex] = vertices[vertexIndex].unhomogenized();
    }

    // Make a polygon out of the transformed vertices.
    var polygon = new Polygon(vertices, 0, this.height);

    // Draw all the scanlines from the polygon.
    var y;
    for (y = polygon.minY; y < polygon.maxY; y++) {
        this.drawScanline(polygon.scanlines[y].left, polygon.scanlines[y].right, uniform, fragmentShader);
    }
};

function drawTorus(surface, ringRadius, tubeRadius, ringVertCount, tubeVertCount, uniform, vertexShader, fragmentShader){
    function makeVertex(ringRatio, tubeRatio){
        var vertex = new Vertex(tubeRadius,0,0,1);
        var normal = new Vertex(1,0,0,1);
        vertex = rotationMatrix(2*Math.PI*tubeRatio,0,0,1).mult(vertex);
        vertex = translationMatrix(ringRadius,0,0).mult(vertex);
        vertex = rotationMatrix(2*Math.PI*ringRatio,0,1,0).mult(vertex);
        normal = rotationMatrix(2*Math.PI*tubeRatio,0,0,1).mult(normal);
        normal = rotationMatrix(2*Math.PI*ringRatio,0,1,0).mult(normal);
        vertex.data.nx = normal.x;
        vertex.data.ny = normal.y;
        vertex.data.nz = normal.z;
        vertex.data.u = ringRatio;
        vertex.data.v = tubeRatio;
        return vertex;
    }
    var r;
    for (r = 0; r < ringVertCount; r++){
        var t;
        for(t = 0; t < tubeVertCount; t++){
            surface.drawPolygon([
                makeVertex(r/ringVertCount, t/tubeVertCount),
                makeVertex((r+1)/ringVertCount, t/tubeVertCount),
                makeVertex((r+1)/ringVertCount, (t+1)/tubeVertCount),
                makeVertex(r/ringVertCount, (t+1)/tubeVertCount),
                ], uniform, vertexShader, fragmentShader);
        }
    }
}

