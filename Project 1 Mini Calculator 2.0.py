print("Mini Calculator")

while True:
    a = int(input("Enter your first number: "))
    b = int(input("Enter your second number: "))

    # Dictionary mapping
    operations = {
        "+": a + b,
        "-": a - b,
        "*": a * b,
        "/": a / b if b != 0 else "Error: Cannot divide by zero",
        "//": a // b,
        "%": a % b
    }

    while True:  # loop until user enters a valid operator
        c = input("Enter the operation (+, -, *, /, %, //): ")

        if c in operations:
            result = operations[c]
            print(a, c, b, "=", result)
            break   # valid → exit inner loop
        else:
            print("Unknown operator, please try again.")

    # Ask if user wants to run again
    choice = input("Do you want to calculate again? (yes/no): ").lower()
    if choice != "yes":
        print("Goodbye 👋")
        break
