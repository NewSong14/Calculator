#Project number 1 : Mini Calculator
print("Mini Calculator")
a= int(input("Enter your first number :"))
b= int(input("Enter your second number :"))


#Disctionary mapping
operations={
    "+":a+b,
    "-":a-b,
    "*":a*b,
    "/":a/b if b !=0 else "Error cant divide by 0",
    "//":a//b if b !=0 else "Error cant divide by 0",
    "%":a%b if b !=0 else "Error cant divide by 0"
}
    
while True:
    c= input("Enter the operation : +,-,*,/,%,// :")

    if c in operations:
        result = operations[c]
        print(a,c,b," = ",result)
        break
    else:
        print("Unknow operator selector, please select from the avaible options")
        print("Enter the correct operator")
