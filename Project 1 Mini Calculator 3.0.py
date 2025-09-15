print("Mini Calculator")
# Dictionary mapping
operations = {
    "+": lambda a,b:a + b,
    "-": lambda a,b:a - b,
    "*": lambda a,b:a * b,
    "/": lambda a,b:a / b if b != 0 else "Error: Cannot divide by zero",
    "//": lambda a,b:a // b if b != 0 else "Error: Not Possible when b=0",
    "%": lambda a,b:a % b if b != 0 else "Error: Not Posbile when b=0"
}


while True:
    a = int(input("Enter your first number: "))
    b = int(input("Enter your second number: "))

    

    while True:  # loop until user enters a valid operator
        c = input("Enter the operation (+, -, *, /, %, //): ")

        if c in operations:
            result = operations[c](a,b)
            print(a, c, b, "=", result)
            break   # valid → exit inner loop
        else:
            print("Unknown operator, please try again.")

    # Ask if user wants to run again
    choice = input("Do you want to calculate again? (yes/no): ").lower()
    if choice != "yes":
        print("Goodbye 👋")
        break
