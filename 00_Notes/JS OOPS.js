class Triangle
{
    //Write the code here
    constructor(s1, s2, s3) {
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
    }
    calculate_area() {
        return this.s1 * this.s2 * this.s3;
    }
    calculate_perimeter() {
        return this.s1 + this.s2 + this.s3;
    }  
}
//Do Not change the Below  Code

var t=new Triangle(3,4,5);
console.log("Area of first triangle: ", t.calculate_area());
var per=t.calculate_perimeter();
console.log("Perimeter of first triangle: ", per);
t=new Triangle(9,10,11);
console.log("Area of second triangle: ", t.calculate_area());
per=t.calculate_perimeter();
console.log("Perimeter of second triangle: ", per);
