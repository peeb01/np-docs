export interface DocSection {
  title: string;
  slug: string;
  description: string;
  badge?: string;
  category: string;
  content: {
    lead: string;
    sections: {
      id: string;
      title: string;
      signature?: string;
      description?: string;
      parameters?: {
        name: string;
        type: string;
        description: string;
      }[];
      returns?: {
        type: string;
        description: string;
      };
      code?: {
        language: string;
        filename?: string;
        code: string;
      };
      output?: string;
      points?: string[];
      callout?: {
        type: "tip" | "info" | "warning";
        title: string;
        text: string;
      };
    }[];
  };
}

export interface NavCategory {
  name: string;
  items: {
    title: string;
    slug: string;
    badge?: string;
  }[];
}

export const DOC_CATEGORIES: NavCategory[] = [
  {
    name: "Getting Started",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation & Setup", slug: "installation", badge: "Guide" },
      { title: "Hello World & CLI", slug: "hello-world" },
    ],
  },
  {
    name: "Language Fundamentals",
    items: [
      { title: "Variables & Type System", slug: "basics" },
      { title: "Control Flow & Loops", slug: "control-flow" },
      { title: "Functions & Parameters", slug: "functions", badge: "v1.1" },
    ],
  },
  {
    name: "Data Structures & OOP",
    items: [
      { title: "Arrays & Dictionaries", slug: "collections" },
      { title: "Custom Structs & Methods", slug: "structs" },
      { title: "Pythonic Comprehensions", slug: "comprehensions" },
    ],
  },
  {
    name: "Advanced Features",
    items: [
      { title: "Modules & Import System", slug: "modules", badge: "Core" },
      { title: "Concurrency & Threads", slug: "concurrency", badge: "v1.1" },
      { title: "GPU Computing (LLVM + NVPTX)", slug: "gpu-computing", badge: "v1.1" },
      { title: "128 & 256-Bit Integers", slug: "big-integers" },
      { title: "Exception Handling", slug: "exceptions" },
      { title: "LLVM Backend Architecture", slug: "architecture" },
    ],
  },
  {
    name: "Standard Library Reference",
    items: [
      { title: "Standard Library Overview", slug: "stdlib" },
      { title: "threads Module (Pure Concurrency)", slug: "stdlib-threads", badge: "v1.1" },
      { title: "gpu Module (NVIDIA CUDA)", slug: "stdlib-gpu", badge: "v1.1" },
      { title: "sys Module (CLI & System)", slug: "stdlib-sys" },
      { title: "time Module (Clock & Timers)", slug: "stdlib-time" },
      { title: "os Module (System & Files)", slug: "stdlib-os" },
      { title: "json Module (Serialization)", slug: "stdlib-json" },
      { title: "regex Module (Pattern Engine)", slug: "stdlib-regex" },
      { title: "crypto Module (SHA-256 Hashing)", slug: "stdlib-crypto", badge: "v1.1" },
      { title: "net Module (TCP Sockets)", slug: "stdlib-net" },
    ],
  },
];

export const DOCS_DATA: Record<string, DocSection> = {
  introduction: {
    title: "Introduction to NP",
    slug: "introduction",
    category: "Getting Started",
    description: "The design philosophy, core architecture, and unique features of the NP compiler.",
    badge: "Overview",
    content: {
      lead: "NP is a lightweight scripting language designed to combine Python-style clean syntax (indentation-based blocks, comprehensions, and structures) with native C++ execution speeds and automated reference-counted memory management.",
      sections: [
        {
          id: "what-is-np",
          title: "What is NP?",
          description: "NP compiles Pythonic .np source files directly into standalone native machine-code binaries using the LLVM C++ API and a precompiled runtime library (libnpruntime.a).",
          points: [
            "Pythonic Clean Syntax: Indentation-based block structure with colon (:), list/dict comprehensions, and clear keywords.",
            "Native LLVM Compilation: Generates optimized LLVM Intermediate Representation (IR) with -O3 optimizations.",
            "Hybrid Type System: Supports both statically typed variables (int, float, string, bool, array, dict) and dynamic variables (var).",
            "Automatic Memory Management (RAII): Primitive types are stack-allocated, while complex types use reference counting with zero GC pauses.",
            "Native Big Integers: Built-in support for 128-bit (int128) and software-implemented 256-bit (int256) signed integers.",
            "First-Class Concurrency: Pure multi-threading (import threads) with hardware CPU inspection, task futures, and configurable memory isolation.",
            "Modern Package Management: Directory entry points (mod.np) and git repository package downloads via 'np get'.",
          ],
        },
        {
          id: "code-example",
          title: "A Quick Taste of NP",
          description: "Here is a complete NP program demonstrating structs, arrays, comprehensions, and functions:",
          code: {
            language: "np",
            filename: "main.np",
            code: `# Define a custom struct
struct Item:
    string name
    int price

# Function returning a computed value
fn calculate_total(array items) -> int:
    int total = 0
    for item in items:
        total = total + item.price
    return total

# Main program
Item apple = Item("Apple", 15)
Item orange = Item("Orange", 25)

array cart = [apple, orange]
int total_cost = calculate_total(cart)

print("Cart Total:", total_cost)

# Pythonic list comprehension
array doubled_prices = [item.price * 2 for item in cart]
print("Doubled Prices:", doubled_prices)`,
          },
          output: `Cart Total: 40
Doubled Prices: [30, 50]`,
        },
      ],
    },
  },

  installation: {
    title: "Installation & Setup Guide",
    slug: "installation",
    category: "Getting Started",
    description: "Complete step-by-step instructions for running NP via Docker, downloading pre-built binaries, or compiling from source.",
    badge: "Step-by-Step",
    content: {
      lead: "Follow this guide to get NP installed on your machine. You can choose between zero-install Docker, downloading pre-compiled binaries, or building from source.",
      sections: [
        {
          id: "method-1-docker",
          title: "Method 1: Zero-Install with Docker (Fastest & Recommended)",
          description: "The quickest way to run NP without installing LLVM or C++ toolchains on your host machine is using the official multi-arch Docker image (supports Linux amd64 and arm64):",
          code: {
            language: "bash",
            filename: "Terminal (Linux / macOS)",
            code: `# Run any .np file instantly:
docker run --rm -it -v "$PWD":/workspace pib21/np-lang:alpine-3.22 my_script.np

# Set up a permanent alias in ~/.bashrc or ~/.zshrc:
alias np='docker run --rm -it -v "$PWD":/workspace pib21/np-lang:alpine-3.22'

# After aliasing, use np directly:
np my_script.np
np build my_script.np`,
          },
          callout: {
            type: "tip",
            title: "Windows PowerShell Setup",
            text: "In PowerShell, add this function to your $PROFILE:\nfunction np { docker run --rm -it -v \"${PWD}:/workspace\" pib21/np-lang:alpine-3.22 $args }",
          },
        },
        {
          id: "method-2-binary",
          title: "Method 2: Pre-compiled Binary (For Language Users)",
          description: "If you download a pre-built release binary of the np compiler, you DO NOT need LLVM installed. You only need a standard C++ linker (g++ or clang) to link the final executable.",
          points: [
            "Ubuntu / Debian / WSL: sudo apt-get update && sudo apt-get install -y build-essential",
            "Alpine Linux: apk add build-base",
            "macOS: xcode-select --install",
            "Windows: MinGW-w64 (GCC) or WSL2",
          ],
          code: {
            language: "bash",
            filename: "Terminal",
            code: `# 1. Download the latest np binary from GitHub Releases
curl -L -o np https://github.com/peeb01/np/releases/latest/download/np-linux-x86_64

# 2. Make it executable and place in PATH
chmod +x np
sudo mv np /usr/local/bin/

# 3. Verify installation
np --version`,
          },
        },
        {
          id: "method-3-source",
          title: "Method 3: Build from Source (For Compiler Developers)",
          description: "If you want to contribute to the compiler or build the C++ codebase directly, you will need LLVM 18+ development headers and a C++17 compiler:",
          points: [
            "Install Dependencies (Ubuntu/Debian): sudo apt-get install -y build-essential llvm-dev cmake git",
            "Install Dependencies (Alpine): apk add build-base llvm-dev llvm-static cmake git",
            "Install Dependencies (macOS): brew install llvm gcc cmake git",
          ],
          code: {
            language: "bash",
            filename: "Terminal",
            code: `# 1. Clone the repository
git clone https://github.com/peeb01/np.git
cd np

# 2. Build using Make:
make re

# 3. Test the built executable:
./np tests/basic.np`,
          },
        },
      ],
    },
  },

  "hello-world": {
    title: "Hello World & CLI Commands",
    slug: "hello-world",
    category: "Getting Started",
    description: "Write your first NP script and learn the two primary execution modes: Run and Build.",
    content: {
      lead: "Let's write a simple program and explore the compiler command-line options.",
      sections: [
        {
          id: "first-program",
          title: "Writing hello.np",
          description: "Create a file named hello.np with the following code:",
          code: {
            language: "np",
            filename: "hello.np",
            code: `# Hello World in NP
string message = "Hello, NP Compiler!"
print(message)

int a = 10
int b = 20
print("Calculation 10 + 20 =", a + b)`,
          },
          output: `Hello, NP Compiler!
Calculation 10 + 20 = 30`,
        },
        {
          id: "two-modes",
          title: "Execution Modes: Run vs Build",
          description: "NP supports two distinct workflows:",
          code: {
            language: "bash",
            filename: "Terminal",
            code: `# 1. Scripting / Run Mode:
# Compiles to a temporary file, executes immediately, and cleans up.
np hello.np

# 2. Ahead-Of-Time (AOT) Build Mode:
# Compiles directly to a standalone native executable (app.out).
np build hello.np

# Run the generated binary:
./app.out`,
          },
          callout: {
            type: "tip",
            title: "Standalone Binaries",
            text: "Binaries produced by 'np build' do not require Python, Node.js, or any virtual machine to run on target systems.",
          },
        },
      ],
    },
  },

  basics: {
    title: "Variables & Type System",
    slug: "basics",
    category: "Language Fundamentals",
    description: "Primitive types, dynamic variables, type conversions, runtime inspection, and built-in utilities.",
    badge: "Core",
    content: {
      lead: "NP provides a versatile hybrid type system. You can write strictly typed variables for compile-time safety and peak LLVM performance, or use dynamic variables (var) for rapid prototyping.",
      sections: [
        {
          id: "type-overview",
          title: "Type System Overview",
          description: "NP variables belong to two categories: stack-allocated primitives and reference-counted heap objects.",
          points: [
            "int: 64-bit signed integer (mapped directly to LLVM i64). Defaults to 0.",
            "float: 64-bit double-precision float (mapped to LLVM double). Defaults to 0.0.",
            "bool: 1-bit boolean flag (true or false). Defaults to false.",
            "string: UTF-8 heap string wrapper around std::string with automatic reference counting.",
            "array: Dynamic heap list (std::vector<np_var>) with reference counting.",
            "dict: Associative map (std::map<string, np_var>) with reference counting.",
            "var: Dynamic variant container that can store any type and rebind at runtime.",
            "int128 / int256: Extended precision signed integers for cryptography and math.",
          ],
        },
        {
          id: "declaring-variables",
          title: "Declaring & Reassigning Variables",
          description: "Declare statically typed variables by prefixing the variable with its type name. Declare dynamic variables using 'var' or implicit assignment.",
          code: {
            language: "np",
            filename: "variables.np",
            code: `# Static variable declarations
int user_id = 1001
float balance = 249.75
string username = "Alice"
bool is_verified = true

# Reassignment (must match original static type)
balance = balance + 50.25

# Dynamic typing with var
var flexible = 42
print("Dynamic as int:", flexible)

flexible = "Now converted to string text!"
print("Dynamic as string:", flexible)

flexible = [10, 20, 30]
print("Dynamic as array:", flexible)`,
          },
          output: `Dynamic as int: 42
Dynamic as string: Now converted to string text!
Dynamic as array: [10, 20, 30]`,
        },
        {
          id: "operators-and-expressions",
          title: "Operators & Expressions (Arithmetic, Power & Bitwise)",
          description: "NP supports standard mathematical operations, exponentiation, and low-level bitwise manipulation.",
          points: [
            "+, -, *, /, %: Standard arithmetic operations for integers, floats, and dynamic variables.",
            "**: Exponentiation operator (power). Computes a ** b (e.g., 2 ** 10 = 1024).",
            "^: Bitwise XOR operator for scalar numbers (e.g., 12 ^ 10 = 6, 2 ^ 10 = 8).",
            "&, |, ~: Bitwise AND, OR, and Bitwise NOT.",
            "<<, >>: Bitwise left-shift and arithmetic right-shift.",
            "+=, -=, *=, /=, %=: In-place compound assignment operators.",
          ],
          code: {
            language: "np",
            filename: "operators.np",
            code: `# Exponentiation (Power) using **
int pow_int = 2 ** 10
float pow_float = 2.5 ** 2
print("2 ** 10 =", pow_int)
print("2.5 ** 2 =", pow_float)

# Bitwise Operations (Note: ^ is Bitwise XOR)
int x = 12   # Binary: 1100
int y = 10   # Binary: 1010
print("12 & 10 (AND):", x & y)   # 8  (1000)
print("12 | 10 (OR):", x | y)    # 14 (1110)
print("12 ^ 10 (XOR):", x ^ y)   # 6  (0110)
print("2 ^ 10 (XOR):", 2 ^ 10)   # 8  (0010 ^ 1010 = 1000)
print("12 << 2 (Shift):", x << 2) # 48

# Compound Assignments
int counter = 10
counter += 5
counter *= 2
print("Counter:", counter)`,
          },
          output: `2 ** 10 = 1024
2.5 ** 2 = 6.25
12 & 10 (AND): 8
12 | 10 (OR): 14
12 ^ 10 (XOR): 6
2 ^ 10 (XOR): 8
12 << 2 (Shift): 48
Counter: 30`,
          callout: {
            type: "warning",
            title: "Important: Exponentiation (**) vs Bitwise XOR (^)",
            text: "For users accustomed to MATLAB, R, or mathematical notation where ^ indicates power: In NP (following Python, C, Go, and Rust conventions), the ^ operator represents Bitwise XOR. To perform mathematical exponentiation or powers, always use the ** operator (e.g. 2**10 = 1024).",
          },
        },
        {
          id: "type-conversions",
          title: "Type Conversions & Parsing",
          description: "Explicit type conversions convert values between primitives and strings safely:",
          signature: "fn int(val) -> int | fn float(val) -> float | fn string(val) -> string",
          parameters: [
            { name: "val", type: "int | float | bool | string | var", description: "The value or string expression to convert." },
          ],
          returns: {
            type: "int | float | string",
            description: "The converted primitive value.",
          },
          code: {
            language: "np",
            filename: "conversions.np",
            code: `# String to integer parsing
string raw_port = "8080"
int port = int(raw_port)
print("Port + 1:", port + 1)

# Float to integer truncation
float raw_price = 99.85
int truncated_price = int(raw_price)
print("Truncated Price:", truncated_price)

# Number to string conversion
int score = 450
string score_text = string(score)
print("Your score is: " + score_text)`,
          },
          output: `Port + 1: 8081
Truncated Price: 99
Your score is: 450`,
        },
        {
          id: "runtime-type-inspection",
          title: "Runtime Type Inspection: type(v)",
          description: "Inspect the runtime type of any variable or expression using type(v):",
          signature: "fn type(var variable) -> string",
          parameters: [
            { name: "variable", type: "any", description: "Any static or dynamic variable to inspect." },
          ],
          returns: {
            type: "string",
            description: "Returns one of: 'int', 'float', 'string', 'bool', 'array', 'dict', 'int128', 'int256'.",
          },
          code: {
            language: "np",
            filename: "type_inspect.np",
            code: `var a = 42
var b = "Hello"
var c = [1, 2, 3]
var d = {"key": "val"}

print("type(a):", type(a))
print("type(b):", type(b))
print("type(c):", type(c))
print("type(d):", type(d))`,
          },
          output: `type(a): int
type(b): string
type(c): array
type(d): dict`,
        },
        {
          id: "built-in-math",
          title: "Built-in Math Utilities",
          description: "Common mathematical helpers are built into the language runtime without requiring imports:",
          points: [
            "min(a, b): Returns the smaller of two numbers.",
            "max(a, b): Returns the larger of two numbers.",
            "sqrt(x): Computes the square root of a positive number.",
            "abs(x): Returns the absolute value.",
            "round(x): Rounds a floating-point number to the nearest integer.",
            "len(x): Returns the length of a string, array, or dict.",
          ],
          code: {
            language: "np",
            filename: "math_builtins.np",
            code: `print("min(10, 25):", min(10, 25))
print("max(10, 25):", max(10, 25))
print("abs(-45.5):", abs(-45.5))
print("sqrt(144):", sqrt(144))
print("round(3.7):", round(3.7))
print("len('Hello'):", len("Hello"))`,
          },
          output: `min(10, 25): 10
max(10, 25): 25
abs(-45.5): 45.5
sqrt(144): 12
round(3.7): 4
len('Hello'): 5`,
        },
        {
          id: "string-methods",
          title: "String Methods & Slicing",
          description: "Strings support Pythonic slicing [start:end] and built-in member methods:",
          points: [
            "s.trim() -> string: Removes leading and trailing whitespace.",
            "s.split(string delimiter) -> array: Splits the string by delimiter.",
            "s.join(array parts) -> string: Joins array elements using s as separator.",
            "s.contains(string substring) -> bool: Returns true if substring is present.",
            "s[start:end]: Slices substring from index start to end.",
          ],
          code: {
            language: "np",
            filename: "string_ops.np",
            code: `string raw = "  admin,operator,guest  "
string trimmed = raw.trim()
print("Trimmed:", trimmed)

array roles = trimmed.split(",")
print("Roles Array:", roles)

string glue = " | "
string joined = glue.join(roles)
print("Joined:", joined)

print("Contains operator?", trimmed.contains("operator"))
print("Slice [0:5]:", trimmed[0:5])`,
          },
          output: `Trimmed: admin,operator,guest
Roles Array: [admin, operator, guest]
Joined: admin | operator | guest
Contains operator? true
Slice [0:5]: admin`,
        },
        {
          id: "file-io-builtins",
          title: "Built-in File I/O: read_file & write_file",
          description: "NP provides top-level built-in file operations for reading and writing files:",
          signature: "fn read_file(string path) -> string | fn write_file(string path, string content) -> int",
          parameters: [
            { name: "path", type: "string", description: "The relative or absolute file path." },
            { name: "content", type: "string", description: "The string data to write to the file." },
          ],
          returns: {
            type: "read_file: string | write_file: int",
            description: "read_file returns file content (or empty string on failure). write_file returns 1 on success, 0 on error.",
          },
          code: {
            language: "np",
            filename: "file_demo.np",
            code: `# Write content to file
int success = write_file("sample.txt", "Hello from NP File Engine!")
if success == 1:
    print("File written successfully!")

# Read content back
string content = read_file("sample.txt")
print("File Read Content:", content)`,
          },
          output: `File written successfully!
File Read Content: Hello from NP File Engine!`,
        },
      ],
    },
  },

  "control-flow": {
    title: "Control Flow & Loops",
    slug: "control-flow",
    category: "Language Fundamentals",
    description: "Indentation-based conditionals (if/elif/else), while loops, and range/collection for-loops.",
    content: {
      lead: "Blocks in NP use Python-style 4-space indentation terminated by a colon (:).",
      sections: [
        {
          id: "conditionals",
          title: "Conditionals (if, elif, else)",
          description: "NP evaluates boolean expressions with standard Python indentation blocks:",
          code: {
            language: "np",
            filename: "grades.np",
            code: `int score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")`,
          },
          output: `Grade: B`,
        },
        {
          id: "loops",
          title: "Loops: while and for",
          description: "Use while for conditional looping, or for for ranges and arrays:",
          code: {
            language: "np",
            filename: "loops.np",
            code: `# While loop
int count = 1
while count <= 3:
    print("While count:", count)
    count = count + 1

# Range-based for loop: range(start, end)
for i in range(0, 3):
    print("Range Index:", i)

# Collection iterator loop
array fruits = ["Apple", "Banana", "Cherry"]
for item in fruits:
    print("Fruit:", item)`,
          },
          output: `While count: 1
While count: 2
While count: 3
Range Index: 0
Range Index: 1
Range Index: 2
Fruit: Apple
Fruit: Banana
Fruit: Cherry`,
        },
      ],
    },
  },

  functions: {
    title: "Functions & Parameters",
    slug: "functions",
    category: "Language Fundamentals",
    description: "Declaring functions with fn, return types, order-independent calls, destructuring, and generics.",
    badge: "v1.1",
    content: {
      lead: "Functions in NP are first-class compiled routines defined with the fn keyword, parameter type signatures, and an optional return type arrow (->).",
      sections: [
        {
          id: "syntax",
          title: "Function Syntax & Declarations",
          description: "Specify parameters with their static types. If a function returns a value, use '-> return_type:'. If no return value is specified, the function is void.",
          signature: "fn name(type param1, type param2) -> return_type:",
          code: {
            language: "np",
            filename: "functions.np",
            code: `# Function with return type
fn add(int x, int y) -> int:
    return x + y

# Void function (no return arrow)
fn greet(string name):
    print("Welcome, " + name + "!")

# Recursive function
fn factorial(int n) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

greet("NP Developer")
print("Sum 15 + 25 =", add(15, 25))
print("Factorial of 5 =", factorial(5))`,
          },
          output: `Welcome, NP Developer!
Sum 15 + 25 = 40
Factorial of 5 = 120`,
        },
        {
          id: "forward-calls",
          title: "Order-Independent Calls (Forward Calls)",
          description: "In NP v1.1.0+, functions can call each other freely regardless of the order in which they are declared in the file. A two-pass compiler automatically hoists prototypes before code generation.",
          code: {
            language: "np",
            filename: "order_independent.np",
            code: `# main() calls helper() BEFORE helper() is defined in the source!
fn main() -> int:
    print("Starting process...")
    process_order("ORD-9821")
    return 0

fn process_order(string order_id):
    print("Processing order: " + order_id)
    send_notification(order_id)

fn send_notification(string order_id):
    print("Notification dispatched for: " + order_id)

main()`,
          },
          output: `Starting process...
Processing order: ORD-9821
Notification dispatched for: ORD-9821`,
        },
        {
          id: "destructuring-returns",
          title: "Multiple Return Values & Destructuring",
          description: "Functions can return array tuples and unpack them directly into variables on the caller side:",
          code: {
            language: "np",
            filename: "destructure.np",
            code: `fn get_dimensions() -> array:
    return [1920, 1080]

# Destructure directly into two typed variables
int width, int height = get_dimensions()
print("Width:", width)
print("Height:", height)`,
          },
          output: `Width: 1920
Height: 1080`,
        },
        {
          id: "generics",
          title: "Generic Functions (Parametric Polymorphism)",
          description: "NP supports generic functions with type parameters like <T>. The compiler automatically monomorphizes specialized versions at compile time:",
          code: {
            language: "np",
            filename: "generics.np",
            code: `# Generic function
fn identity<T>(T val) -> T:
    return val

int num = identity(42)
string text = identity("Compiled Generics")

print("Generic int:", num)
print("Generic string:", text)`,
          },
          output: `Generic int: 42
Generic string: Compiled Generics`,
        },
      ],
    },
  },

  collections: {
    title: "Arrays & Dictionaries",
    slug: "collections",
    category: "Data Structures & OOP",
    description: "Heap-allocated dynamic arrays and associative dictionaries with automatic memory management.",
    content: {
      lead: "Arrays and Dictionaries are dynamic containers backed by C++ std::vector and std::map, managed with automatic reference counting.",
      sections: [
        {
          id: "arrays",
          title: "Dynamic Arrays (array)",
          description: "Arrays hold an ordered list of elements. They support zero-based indexing, slicing, and built-in methods:",
          points: [
            "arr.append(val): Adds an element to the end of the array.",
            "arr.pop() -> var: Removes and returns the last element.",
            "arr.sort(): Sorts the array elements in-place.",
            "arr.reverse(): Reverses the order of elements in-place.",
            "arr.contains(val) -> bool: Returns true if element exists in the array.",
            "len(arr) -> int: Returns the number of elements.",
          ],
          code: {
            language: "np",
            filename: "arrays_demo.np",
            code: `array nums = [30, 10, 20]
nums.append(40)
print("After append:", nums)

nums.sort()
print("After sort:", nums)

var popped = nums.pop()
print("Popped item:", popped)
print("After pop:", nums)

print("Contains 20?", nums.contains(20))
print("Array length:", len(nums))`,
          },
          output: `After append: [30, 10, 20, 40]
After sort: [10, 20, 30, 40]
Popped item: 40
After pop: [10, 20, 30]
Contains 20? true
Array length: 3`,
        },
        {
          id: "dictionaries",
          title: "Associative Dictionaries (dict)",
          description: "Dictionaries store key-value pairs with fast string-keyed lookup:",
          points: [
            "d[key]: Accesses or assigns a value by string key.",
            "d.keys() -> array: Returns an array of all keys in the dictionary.",
            "d.values() -> array: Returns an array of all values in the dictionary.",
            "len(d) -> int: Returns the number of key-value pairs.",
          ],
          code: {
            language: "np",
            filename: "dict_demo.np",
            code: `dict user = {
    "name": "Sarah",
    "role": "Engineer",
    "level": 4
}

# Accessing keys
print("User name:", user["name"])

# Updating / adding new keys
user["level"] = 5
user["department"] = "Core Platform"

print("Updated level:", user["level"])
print("Keys:", user.keys())
print("Dict size:", len(user))`,
          },
          output: `User name: Sarah
Updated level: 5
Keys: [department, level, name, role]
Dict size: 4`,
        },
      ],
    },
  },

  structs: {
    title: "Custom Structs & Methods",
    slug: "structs",
    category: "Data Structures & OOP",
    description: "Lightweight object models with typed fields, receiver methods, and interfaces.",
    badge: "OOP",
    content: {
      lead: "Structs in NP allow you to model custom business data. In v1.1.0, structs support receiver methods and dynamic dispatch interfaces.",
      sections: [
        {
          id: "declaring-structs",
          title: "Defining and Instantiating Structs",
          description: "Define a struct using the struct keyword, listing typed fields inside the block. The compiler automatically creates a constructor matching field declaration order:",
          code: {
            language: "np",
            filename: "user_struct.np",
            code: `struct Account:
    string username
    int balance
    bool is_active

# Instantiation via generated constructor
Account acc = Account("alice_dev", 1500, true)

# Reading fields with dot-notation
print("Username:", acc.username)
print("Balance:", acc.balance)

# Modifying fields
acc.balance = acc.balance + 250
print("New Balance:", acc.balance)`,
          },
          output: `Username: alice_dev
Balance: 1500
New Balance: 1750`,
        },
        {
          id: "struct-methods",
          title: "Receiver Methods: fn (self Type) method()",
          description: "Attach methods directly to a struct using receiver syntax:",
          code: {
            language: "np",
            filename: "methods.np",
            code: `struct BankAccount:
    string owner
    int balance

# Define a method on BankAccount
fn (self BankAccount) deposit(int amount) -> int:
    self.balance = self.balance + amount
    return self.balance

fn (self BankAccount) display():
    print("Account of " + self.owner + " has balance: $" + string(self.balance))

BankAccount acct = BankAccount("Charlie", 500)
acct.deposit(200)
acct.display()`,
          },
          output: `Account of Charlie has balance: $700`,
        },
      ],
    },
  },

  comprehensions: {
    title: "Pythonic Comprehensions",
    slug: "comprehensions",
    category: "Data Structures & OOP",
    description: "List and dictionary comprehensions for expressive mapping and filtering in a single line.",
    content: {
      lead: "Comprehensions are compiled into highly optimized loops directly at the LLVM IR level.",
      sections: [
        {
          id: "list-comp",
          title: "List & Dict Comprehensions",
          description: "Transform and filter collections concisely:",
          code: {
            language: "np",
            filename: "comprehensions.np",
            code: `# Basic List Comprehension
array numbers = [x * 2 for x in range(1, 6)]
print("Doubled:", numbers)

# List Comprehension with Filter condition
array evens = [x for x in numbers if x > 5]
print("Filtered > 5:", evens)

# Dictionary Comprehension
dict squares = {x: x * x for x in range(1, 5)}
print("Squares Dict:", squares)`,
          },
          output: `Doubled: [2, 4, 6, 8, 10]
Filtered > 5: [6, 8, 10]
Squares Dict: {1: 1, 2: 4, 3: 9, 4: 16}`,
        },
      ],
    },
  },

  modules: {
    title: "Modules & Import System",
    slug: "modules",
    category: "Advanced Features",
    description: "Organizing code across files and packages with clean imports, aliases, and package managers.",
    badge: "Core",
    content: {
      lead: "NP supports modern modular programming with Go-style imports, grouped parentheses, clean paths without file extensions, directory packages (mod.np), and remote git package fetching.",
      sections: [
        {
          id: "single-and-grouped",
          title: "1. Single & Grouped Imports",
          description: "You can import standard library modules or local source files cleanly without writing the .np extension:",
          code: {
            language: "np",
            filename: "main.np",
            code: `# Single standard library import
import "time"

# Grouped imports (Go-style)
import (
    "os"
    "json"
    "sys"
)

# Use imported package functions via module prefix
print("Current Time:", time.now())
print("Arguments count:", len(sys.argv))`,
          },
          output: `Current Time: 1727710245.129
Arguments count: 1`,
        },
        {
          id: "import-aliases",
          title: "2. Package Aliases (Prefix and as-style)",
          description: "When importing long or colliding module paths, assign an alias:",
          code: {
            language: "np",
            filename: "alias_demo.np",
            code: `# Go-style prefix alias:
import calc "./math_calculator"

# Python-style postfix alias:
import "./utils/string_tools" as st

# Default package alias (automatically uses base name of the path):
import "./logger"

# Call functions via alias
print(calc.multiply(6, 7))
print(st.capitalize("np language"))
logger.info("Application initialized")`,
          },
        },
        {
          id: "directory-entry-points",
          title: "3. Directory Imports & Entry Points (mod.np)",
          description: "When importing a directory (e.g. import 'pulsar'), the NP compiler automatically resolves the package entry point in this order:",
          points: [
            "1. <path>/mod.np (Standard convention for multi-module packages)",
            "2. <path>/<folder_name>.np (Matching name convention)",
            "3. <path>/main.np",
            "4. <path>/index.np",
          ],
          callout: {
            type: "tip",
            title: "Clean Framework Imports",
            text: "Packages like Pulsar export their entire API from mod.np, allowing consumers to write a single top-level: import \"pulsar\"",
          },
        },
        {
          id: "package-manager",
          title: "4. Package Management with 'np get'",
          description: "NP includes a built-in package manager to download libraries directly from Git into .np_packages/:",
          code: {
            language: "bash",
            filename: "Terminal",
            code: `# Download package into .np_packages/
np get https://github.com/peeb01/pulsar.git

# In your code, import it directly:
# import "pulsar"
# or import "github.com/peeb01/pulsar"`,
          },
        },
      ],
    },
  },

  concurrency: {
    title: "Concurrency & Pure Threads",
    slug: "concurrency",
    category: "Advanced Features",
    description: "Native multi-core parallel execution with zero boilerplate, hardware core detection, task futures, and automatic race condition management.",
    badge: "v1.1",
    content: {
      lead: "NP provides a modern, pure multi-threading model designed for effortless parallel execution. Simply import 'threads' to inspect hardware execution cores, spawn asynchronous worker tasks with threads.run(), synchronize results via task.wait(), and configure memory safety (isolated=true) to eliminate race conditions.",
      sections: [
        {
          id: "threads-philosophy",
          title: "1. The Pure Threads Philosophy",
          description: "Unlike complex actor frameworks or low-level channel boilerplate, NP treats concurrency as first-class asynchronous function dispatching with automated future synchronization:",
          points: [
            "Zero Boilerplate: No channel allocation or manual mutex locks required. Just write standard functions and pass them to threads.run().",
            "Hardware-Aware: Directly queries the machine's hardware execution cores via threads.num_cpu() to dimension workloads dynamically.",
            "Configurable Memory Isolation: Choose between blazing C-speed zero-copy pointer sharing (isolated=false) or 100% race-condition-free shared-nothing isolation (isolated=true).",
            "Future Synchronization: Every thread returns a lightweight Task future handle. Simply call task.wait() to block and retrieve the result.",
          ],
        },
        {
          id: "threads-quickstart",
          title: "2. Quick Start: threads.run & task.wait()",
          description: "Spawn any function asynchronously on an OS thread and retrieve its return value:",
          signature: "fn threads.run(func worker, ...args, bool isolated = false) -> Task",
          parameters: [
            { name: "worker", type: "function", description: "Target function identifier to execute asynchronously." },
            { name: "...args", type: "any", description: "Positional arguments passed to the worker function." },
            { name: "isolated", type: "bool", description: "If true, arguments are deep-cloned to guarantee 100% race-condition-free execution." },
          ],
          returns: {
            type: "Task",
            description: "A concurrent task future. Call task.wait() to block and retrieve the function return value.",
          },
          code: {
            language: "np",
            filename: "threads_quickstart.np",
            code: `import threads
import time

func compute_square(int n) -> int:
    time.sleep(0.05)
    return n * n

func main():
    print("Available CPU cores:", threads.num_cpu())
    
    # Spawn background task
    print("Spawning worker task...")
    task := threads.run(compute_square, 12)
    
    print("Main thread running other operations concurrently...")
    
    # Wait for result
    res := task.wait()
    print("Square result:", res)

main()`,
          },
          output: `Available CPU cores: 8
Spawning worker task...
Main thread running other operations concurrently...
Square result: 144`,
        },
        {
          id: "threads-shorthand",
          title: "3. Direct Invocation & Flexible Synchronization: threads(fn)",
          description: "NP allows calling the threads module directly as a function for concise syntax, and synchronizing with either method or functional syntax:",
          points: [
            "threads(worker, ...args): Callable module shorthand equivalent to threads.run(worker, ...args).",
            "task.wait(): Method call syntax on the Task instance.",
            "threads.wait(task): Functional module utility equivalent to task.wait().",
            "threads.num_cpu: Property access without parentheses.",
          ],
          code: {
            language: "np",
            filename: "threads_shorthand.np",
            code: `import threads

func greet_async(string name) -> string:
    return "Hello from thread, " + name + "!"

func main():
    # Direct callable module invocation
    task := threads(greet_async, "NP Developer")
    
    # Functional wait syntax
    message := threads.wait(task)
    print(message)

main()`,
          },
          output: `Hello from thread, NP Developer!`,
        },
        {
          id: "threads-race-condition",
          title: "4. Configurable Race Condition Management: isolated=true",
          description: "Configure memory safety per thread call: choose between raw C-speed zero-copy pointer sharing or 100% race-condition-free execution:",
          points: [
            "isolated = false (Default): High-Performance / C-Speed. Passes memory pointers directly with zero copy overhead. Ideal for read-heavy workloads or large datasets.",
            "isolated = true: Shared-Nothing / Memory Isolation. The NP runtime recursively deep-clones all arguments before starting the thread. Mutations inside the worker never affect caller data, eliminating race conditions entirely.",
          ],
          callout: {
            type: "warning",
            title: "Memory Safety Trade-off",
            text: "Deep-copying massive datasets (e.g. 100M items) consumes RAM and CPU time. Use isolated=false for zero-copy read pipelines, and isolated=true when safe state isolation is mandatory.",
          },
          code: {
            language: "np",
            filename: "race_condition_safe.np",
            code: `import threads

func modify_list(items) -> int:
    items.append(999)
    return items.len()

func main():
    # 1. Isolated Execution: Caller state is completely protected
    safe_list := [1, 2, 3]
    task_iso := threads.run(modify_list, safe_list, isolated = true)
    print("Isolated worker list length:", task_iso.wait())
    print("Caller list length remains:", safe_list.len())
    
    # 2. Shared Execution: Zero-copy in-place modification
    shared_list := [10, 20, 30]
    task_shared := threads.run(modify_list, shared_list)
    print("Shared worker list length:", task_shared.wait())
    print("Caller list modified in-place:", shared_list.len())

main()`,
          },
          output: `Isolated worker list length: 4
Caller list length remains: 3
Shared worker list length: 4
Caller list modified in-place: 4`,
        },
      ],
    },
  },

  "big-integers": {
    title: "128 & 256-Bit Integers",
    slug: "big-integers",
    category: "Advanced Features",
    description: "Built-in hardware and software large integers for cryptography and large-scale arithmetic.",
    content: {
      lead: "NP provides native support for int128 and int256 with full arithmetic operator support.",
      sections: [
        {
          id: "bigint-usage",
          title: "Working with int128 and int256",
          description: "Compute large numbers without floating-point precision loss:",
          code: {
            language: "np",
            filename: "bigint.np",
            code: `# 128-bit integer (maps to GCC __int128)
int128 huge_num = 170141183460469231731687303715884105727

# 256-bit software integer
int256 crypto_val = 115792089237316195423570985008687907853269984665640564039457584007913129639935

print("128-bit value:", huge_num)
print("256-bit value:", crypto_val)

int128 doubled = huge_num * 2
print("Doubled 128-bit:", doubled)`,
          },
          output: `128-bit value: 170141183460469231731687303715884105727
256-bit value: 115792089237316195423570985008687907853269984665640564039457584007913129639935
Doubled 128-bit: 340282366920938463463374607431768211454`,
        },
      ],
    },
  },

  exceptions: {
    title: "Exception Handling",
    slug: "exceptions",
    category: "Advanced Features",
    description: "Catching runtime errors and managing failure conditions with try and except.",
    content: {
      lead: "Handle exceptional runtime scenarios gracefully without crashing your program.",
      sections: [
        {
          id: "try-except",
          title: "Try / Except Blocks",
          description: "Wrap error-prone blocks in try and handle failures in except:",
          code: {
            language: "np",
            filename: "exceptions.np",
            code: `fn divide(int a, int b) -> int:
    if b == 0:
        throw "Division by zero is not allowed"
    return a / b

try:
    int result = divide(10, 0)
    print("Result:", result)
except:
    print("Recovered safely from division error!")

print("Program continues executing normally.")`,
          },
          output: `Recovered safely from division error!
Program continues executing normally.`,
        },
      ],
    },
  },

  architecture: {
    title: "LLVM Backend Architecture",
    slug: "architecture",
    category: "Advanced Features",
    description: "How the NP compiler lowers AST to LLVM IR, applies -O3 optimization, and links with libnpruntime.a.",
    content: {
      lead: "NP uses the official LLVM C++ API to compile human-readable source code into optimized native machine code.",
      sections: [
        {
          id: "pipeline",
          title: "Compilation Pipeline",
          points: [
            "1. Lexer (core/lexer/): Scans source code into tokens with indentation and line position tracking.",
            "2. AST Parser (core/parser/): Hand-written recursive descent parser building an Abstract Syntax Tree.",
            "3. LLVM CodeGen (core/llvm/): Two-pass function hoister and SSA IR code generation with -O3 optimizations.",
            "4. Linker: Emits temporary object file (.o) and links with runtime/libnpruntime.a using g++ or clang++.",
          ],
        },
      ],
    },
  },

  stdlib: {
    title: "Standard Library Overview",
    slug: "stdlib",
    category: "Standard Library",
    description: "Comprehensive guide to all built-in packages included with the NP Language runtime.",
    content: {
      lead: "The NP Standard Library ships directly inside the runtime library (libnpruntime.a) for zero-dependency execution. All packages are loaded via clean import statements without external dependencies.",
      sections: [
        {
          id: "modules-table",
          title: "Standard Library Modules",
          description: "The following modules are available out of the box in every NP installation:",
          points: [
            "sys: Command-line arguments (sys.argv) and runtime execution environment.",
            "time: High-resolution Unix timestamps (time.now), delay timers (time.sleep), and strftime formatting (time.format).",
            "os: Operating system process execution (os.exec, os.system), environment variables (os.getenv), and file operations.",
            "json: Fast JSON string serialization (json.stringify) and object parsing (json.parse).",
            "regex: Regular expression matching (regex.match), pattern search (regex.find), and replacement (regex.replace).",
            "crypto: Cryptographic hashing functions including SHA-256 (crypto.sha256).",
            "net: Low-level TCP socket networking primitives (net_listen, net_accept, net_connect, net_send, net_recv, net_close).",
          ],
        },
        {
          id: "how-to-import",
          title: "How to Import Standard Library Modules",
          description: "Import any standard module by quoted name. All exported module functions can be invoked via the module prefix:",
          code: {
            language: "np",
            filename: "stdlib_showcase.np",
            code: `import (
    "time"
    "os"
    "json"
    "crypto"
)

# 1. Measure timestamp
float t_start = time.now()

# 2. Run shell command
string user = os.exec("whoami")

# 3. Hash text
string digest = crypto.sha256("admin_password")

# 4. Serialize dict to JSON
dict payload = {
    "user": user,
    "hash": digest,
    "timestamp": t_start
}
string json_text = json.stringify(payload)
print(json_text)`,
          },
        },
      ],
    },
  },

  "stdlib-sys": {
    title: "sys Module (CLI & System)",
    slug: "stdlib-sys",
    category: "Standard Library",
    description: "Inspect command-line arguments and program execution parameters.",
    content: {
      lead: "The sys module provides access to variables used or maintained by the compiler and interpreter runtime.",
      sections: [
        {
          id: "sys-argv",
          title: "sys.argv (Command-Line Arguments)",
          signature: "sys.argv -> array",
          description: "An array of strings representing the arguments passed to the program from the terminal. sys.argv[0] is always the executable path.",
          returns: {
            type: "array",
            description: "Array of string arguments passed to the process.",
          },
          code: {
            language: "np",
            filename: "cli_args.np",
            code: `import "sys"

print("Total Arguments:", len(sys.argv))
print("Program binary:", sys.argv[0])

# Inspect arguments if passed
if len(sys.argv) > 1:
    print("First argument:", sys.argv[1])

# Loop through all arguments
for arg in sys.argv:
    print("Argument:", arg)`,
          },
          output: `Total Arguments: 1
Program binary: ./app.out
Argument: ./app.out`,
        },
      ],
    },
  },

  "stdlib-time": {
    title: "time Module (Clock & Timers)",
    slug: "stdlib-time",
    category: "Standard Library",
    description: "High-resolution monotonic timestamps, precision delays, and date formatting.",
    content: {
      lead: "The time module provides functions for measuring execution time, sleeping threads, and formatting dates.",
      sections: [
        {
          id: "time-now",
          title: "time.now()",
          signature: "fn time.now() -> float",
          description: "Returns the current Unix timestamp as a 64-bit floating-point number representing seconds since January 1, 1970 UTC (with microsecond precision).",
          returns: {
            type: "float",
            description: "Current Unix epoch timestamp in seconds.",
          },
          code: {
            language: "np",
            filename: "benchmark.np",
            code: `import "time"

float start = time.now()
print("Current timestamp:", start)`,
          },
          output: `Current timestamp: 1727710245.852`,
        },
        {
          id: "time-sleep",
          title: "time.sleep(float seconds)",
          signature: "fn time.sleep(float seconds) -> void",
          description: "Suspends the execution of the calling thread for the specified number of seconds. Supports fractional seconds for millisecond precision.",
          parameters: [
            { name: "seconds", type: "float | int", description: "The duration to sleep in seconds (e.g. 0.25 for 250 milliseconds)." },
          ],
          returns: {
            type: "void",
            description: "No return value.",
          },
          code: {
            language: "np",
            filename: "sleep_demo.np",
            code: `import "time"

print("Starting task...")
float start = time.now()

# Sleep for 150 milliseconds (0.15s)
time.sleep(0.15)

float elapsed = time.now() - start
print("Finished! Elapsed seconds:", elapsed)`,
          },
          output: `Starting task...
Finished! Elapsed seconds: 0.151`,
        },
        {
          id: "time-format",
          title: "time.format(float timestamp, string fmt)",
          signature: "fn time.format(float timestamp, string fmt) -> string",
          description: "Formats a Unix timestamp into a readable date/time string using standard C strftime formatting codes.",
          parameters: [
            { name: "timestamp", type: "float", description: "The Unix timestamp to format." },
            { name: "fmt", type: "string", description: "The strftime formatting template (e.g. '%Y-%m-%d %H:%M:%S')." },
          ],
          returns: {
            type: "string",
            description: "Formatted date/time string.",
          },
          code: {
            language: "np",
            filename: "format_demo.np",
            code: `import "time"

float current_time = time.now()
string formatted = time.format(current_time, "%Y-%m-%d %H:%M:%S")
print("Formatted DateTime:", formatted)`,
          },
          output: `Formatted DateTime: 2026-09-30 22:15:00`,
        },
      ],
    },
  },

  "stdlib-os": {
    title: "os Module (System & Files)",
    slug: "stdlib-os",
    category: "Standard Library",
    description: "Execute shell commands, read environment variables, and manage system operations.",
    content: {
      lead: "The os module provides a portable interface for interacting with the underlying operating system environment.",
      sections: [
        {
          id: "os-exec",
          title: "os.exec(string command)",
          signature: "fn os.exec(string command) -> string",
          description: "Executes a shell command synchronously through a piped subshell, captures its standard output (stdout), trims any trailing newline, and returns the output as a string.",
          parameters: [
            { name: "command", type: "string", description: "The command line string to execute." },
          ],
          returns: {
            type: "string",
            description: "The captured stdout output of the command.",
          },
          code: {
            language: "np",
            filename: "exec_demo.np",
            code: `import "os"

# Execute system commands and capture output
string current_dir = os.exec("pwd")
print("Current Working Directory:", current_dir)

string who = os.exec("whoami")
print("Current User:", who)`,
          },
          output: `Current Working Directory: /workspace
Current User: root`,
        },
        {
          id: "os-system",
          title: "os.system(string command)",
          signature: "fn os.system(string command) -> int",
          description: "Executes a system shell command with output streaming directly to the terminal, returning the process exit code.",
          parameters: [
            { name: "command", type: "string", description: "The command to run." },
          ],
          returns: {
            type: "int",
            description: "The integer return code of the command (0 typically means success).",
          },
          code: {
            language: "np",
            filename: "system_demo.np",
            code: `import "os"

int status = os.system("echo 'Direct stream output'")
print("Command Exit Status:", status)`,
          },
          output: `Direct stream output
Command Exit Status: 0`,
        },
        {
          id: "os-getenv",
          title: "os.getenv(string name)",
          signature: "fn os.getenv(string name) -> string",
          description: "Retrieves the value of an environment variable. If the variable does not exist, it returns an empty string (\"\").",
          parameters: [
            { name: "name", type: "string", description: "The environment variable key name." },
          ],
          returns: {
            type: "string",
            description: "The environment variable value, or \"\" if not set.",
          },
          code: {
            language: "np",
            filename: "getenv_demo.np",
            code: `import "os"

string path_var = os.getenv("PATH")
print("Has PATH env?", len(path_var) > 0)

string missing = os.getenv("NON_EXISTENT_VAR")
print("Missing var is empty?", missing == "")`,
          },
          output: `Has PATH env? true
Missing var is empty? true`,
        },
      ],
    },
  },

  "stdlib-json": {
    title: "json Module (Serialization)",
    slug: "stdlib-json",
    category: "Standard Library",
    description: "Fast JSON parsing into native dictionaries/arrays and string serialization.",
    content: {
      lead: "The json module provides bi-directional conversion between JSON text and native NP dictionary/array data structures.",
      sections: [
        {
          id: "json-parse",
          title: "json.parse(string source)",
          signature: "fn json.parse(string source) -> var",
          description: "Parses a valid JSON string and returns the rebuilt nested dict or array object.",
          parameters: [
            { name: "source", type: "string", description: "The JSON encoded string to parse." },
          ],
          returns: {
            type: "var (dict | array)",
            description: "The parsed dictionary or array.",
          },
          code: {
            language: "np",
            filename: "parse_demo.np",
            code: `import "json"

string raw_json = "{\\"service\\": \\"auth\\", \\"port\\": 9000, \\"roles\\": [\\"admin\\", \\"user\\"]}"

dict data = json.parse(raw_json)
print("Service Name:", data["service"])
print("Port Number:", data["port"])
print("First Role:", data["roles"][0])`,
          },
          output: `Service Name: auth
Port Number: 9000
First Role: admin`,
        },
        {
          id: "json-stringify",
          title: "json.stringify(var value)",
          signature: "fn json.stringify(var value) -> string",
          description: "Serializes a dictionary, array, or primitive variable into a compact JSON string.",
          parameters: [
            { name: "value", type: "dict | array | var", description: "The data structure to serialize." },
          ],
          returns: {
            type: "string",
            description: "The serialized JSON string.",
          },
          code: {
            language: "np",
            filename: "stringify_demo.np",
            code: `import "json"

dict payload = {
    "success": true,
    "code": 200,
    "items": ["cpu", "memory", "disk"]
}

string json_str = json.stringify(payload)
print("JSON Output:", json_str)`,
          },
          output: `JSON Output: {"code":200,"items":["cpu","memory","disk"],"success":true}`,
        },
      ],
    },
  },

  "stdlib-regex": {
    title: "regex Module (Pattern Engine)",
    slug: "stdlib-regex",
    category: "Standard Library",
    description: "High-performance POSIX regular expression matching, search, and replacement.",
    content: {
      lead: "The regex module provides pattern matching, substring extraction, and text replacement backed by C++ std::regex.",
      sections: [
        {
          id: "regex-match",
          title: "regex.match(string pattern, string text)",
          signature: "fn regex.match(string pattern, string text) -> bool",
          description: "Evaluates whether the regular expression pattern matches the input text in its entirety.",
          parameters: [
            { name: "pattern", type: "string", description: "The regular expression pattern." },
            { name: "text", type: "string", description: "The target string to validate." },
          ],
          returns: {
            type: "bool",
            description: "true if the pattern matches the full text, false otherwise.",
          },
          code: {
            language: "np",
            filename: "regex_match.np",
            code: `import "regex"

string email = "dev@peeb.io"
string email_pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

bool valid = regex.match(email_pattern, email)
print("Is Valid Email:", valid)

bool invalid = regex.match(email_pattern, "not_an_email")
print("Is Valid Email:", invalid)`,
          },
          output: `Is Valid Email: true
Is Valid Email: false`,
        },
        {
          id: "regex-find",
          title: "regex.find(string pattern, string text)",
          signature: "fn regex.find(string pattern, string text) -> string",
          description: "Searches the input text and extracts the first substring matching the regex pattern. Returns an empty string if not found.",
          parameters: [
            { name: "pattern", type: "string", description: "The search pattern." },
            { name: "text", type: "string", description: "The input text to search within." },
          ],
          returns: {
            type: "string",
            description: "The first matched substring, or \"\" if no match.",
          },
          code: {
            language: "np",
            filename: "regex_find.np",
            code: `import "regex"

string log = "2026-09-30 [ERROR] Connection timeout on 192.168.1.15:8080"
string ip_pattern = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}"

string extracted_ip = regex.find(ip_pattern, log)
print("Extracted IP Address:", extracted_ip)`,
          },
          output: `Extracted IP Address: 192.168.1.15`,
        },
        {
          id: "regex-replace",
          title: "regex.replace(string pattern, string replacement, string text)",
          signature: "fn regex.replace(string pattern, string repl, string text) -> string",
          description: "Replaces all occurrences of the pattern in the target text with the replacement string.",
          parameters: [
            { name: "pattern", type: "string", description: "The regex pattern to search for." },
            { name: "repl", type: "string", description: "The replacement string." },
            { name: "text", type: "string", description: "The source string." },
          ],
          returns: {
            type: "string",
            description: "The transformed string with all matches replaced.",
          },
          code: {
            language: "np",
            filename: "regex_replace.np",
            code: `import "regex"

string text = "Order #1234 cost $5678"
string masked = regex.replace("[0-9]", "*", text)
print("Masked Result:", masked)`,
          },
          output: `Masked Result: Order #**** cost $****`,
        },
      ],
    },
  },

  "stdlib-crypto": {
    title: "crypto Module (SHA-256 Hashing)",
    slug: "stdlib-crypto",
    category: "Standard Library",
    description: "Native cryptographic hash functions for data integrity and security.",
    badge: "v1.1",
    content: {
      lead: "The crypto module provides native cryptographic hash operations implemented in C++ without external OpenSSL dependencies.",
      sections: [
        {
          id: "crypto-sha256",
          title: "crypto.sha256(string data)",
          signature: "fn crypto.sha256(string data) -> string",
          description: "Computes the standard SHA-256 cryptographic digest of the input string, returning a 64-character lowercase hexadecimal string.",
          parameters: [
            { name: "data", type: "string", description: "The input string data to hash." },
          ],
          returns: {
            type: "string",
            description: "A 64-character hexadecimal SHA-256 hash digest.",
          },
          code: {
            language: "np",
            filename: "sha256_demo.np",
            code: `import "crypto"

string secret = "hello world"
string hash = crypto.sha256(secret)

print("Input:", secret)
print("SHA-256:", hash)`,
          },
          output: `Input: hello world
SHA-256: b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9`,
        },
      ],
    },
  },

  "stdlib-net": {
    title: "net Module (TCP Sockets)",
    slug: "stdlib-net",
    category: "Standard Library",
    description: "Low-level TCP network socket primitives for high-performance servers and clients.",
    content: {
      lead: "The net functions provide direct access to native OS TCP sockets (represented as integer file descriptors fd) for blazing fast network I/O.",
      sections: [
        {
          id: "socket-functions",
          title: "Socket Primitive Functions",
          description: "The core socket networking primitives:",
          points: [
            "net_listen(int port) -> int: Binds 0.0.0.0 on port and starts listening. Returns server socket fd or -1 on error.",
            "net_accept(int server_fd) -> int: Blocks until a client connects. Returns client socket fd.",
            "net_connect(string host, int port) -> int: Connects to a remote host and port. Returns socket fd or -1.",
            "net_send(int socket_fd, string data) -> int: Sends string data over the socket. Returns bytes sent.",
            "net_recv(int socket_fd, int max_bytes) -> string: Reads up to max_bytes from the socket. Returns received string.",
            "net_close(int socket_fd) -> void: Closes the socket file descriptor.",
          ],
        },
        {
          id: "echo-server",
          title: "Example: Minimal TCP Echo Server",
          description: "A simple TCP server listening on port 8080 and echoing messages back to clients:",
          code: {
            language: "np",
            filename: "echo_server.np",
            code: `int server_fd = net_listen(8080)
if server_fd < 0:
    print("Failed to listen on port 8080")
else:
    print("Server listening on port 8080...")
    int client_fd = net_accept(server_fd)
    if client_fd >= 0:
        string msg = net_recv(client_fd, 1024)
        print("Received from client: " + msg)
        net_send(client_fd, "Echo: " + msg)
        net_close(client_fd)
    net_close(server_fd)`,
          },
        },
      ],
    },
  },

  "stdlib-threads": {
    title: "threads Module (Pure Concurrency)",
    slug: "stdlib-threads",
    category: "Standard Library",
    description: "Multi-core OS thread execution, hardware core discovery, task futures, and configurable memory isolation for race condition prevention.",
    badge: "v1.1",
    content: {
      lead: "The threads module delivers native OS-level multi-core parallel execution. It provides hardware inspection (threads.num_cpu), asynchronous spawning (threads.run), future synchronization (task.wait()), and configurable race condition protection via Shared-Nothing isolated memory execution.",
      sections: [
        {
          id: "threads-overview",
          title: "Hardware Core Inspection: threads.num_cpu",
          description: "Inspect the host machine's hardware execution threads (logical CPU cores) to dimension thread pools dynamically:",
          signature: "fn threads.num_cpu() -> int",
          returns: {
            type: "int",
            description: "Number of hardware CPU cores available on the current machine (minimum 1).",
          },
          points: [
            "threads.num_cpu(): Function call syntax.",
            "threads.num_cpu: Property access shorthand.",
          ],
          code: {
            language: "np",
            filename: "cpu_info.np",
            code: `import threads

# Hardware inspection
int cores = threads.num_cpu()
print("Available CPU cores:", cores)

# Property access shorthand
print("Logical cores (property):", threads.num_cpu)`,
          },
          output: `Available CPU cores: 8
Logical cores (property): 8`,
        },
        {
          id: "level1-quickstart",
          title: "Level 1: Quickstart & Task Synchronization (task.wait)",
          description: "threads.run dispatches any function to execute on an asynchronous OS thread and returns a Task future handle:",
          signature: "fn threads.run(func worker, ...args, bool isolated = false) -> Task",
          parameters: [
            { name: "worker", type: "function", description: "Target function identifier to execute asynchronously." },
            { name: "...args", type: "any", description: "Arguments passed to the worker function." },
            { name: "isolated", type: "bool", description: "Optional named flag (defaults to false). When true, arguments are deep-cloned to prevent race conditions." },
          ],
          returns: {
            type: "Task",
            description: "Task future handle. Call task.wait() or threads.wait(task) to block until completion and obtain the returned value.",
          },
          points: [
            "task.wait(): Method syntax to wait and retrieve the result.",
            "threads.wait(task): Functional module syntax.",
            "threads(worker, ...): Shorthand callable syntax for threads.run.",
          ],
          code: {
            language: "np",
            filename: "level1_basic.np",
            code: `import threads
import time

func heavy_calculation(int a, int b) -> int:
    time.sleep(0.05)
    return a * b + 100

func main():
    print("Spawning asynchronous task...")
    
    # 1. Spawn worker thread
    task1 := threads.run(heavy_calculation, 20, 5)
    
    # 2. Main thread can continue other operations concurrently
    print("Main thread running concurrently...")
    
    # 3. Block and retrieve computation result
    result := task1.wait()
    print("Task completed with result:", result)
    
    # Alternative shorthand syntax:
    task2 := threads(heavy_calculation, 50, 2)
    print("Task 2 result:", threads.wait(task2))

main()`,
          },
          output: `Spawning asynchronous task...
Main thread running concurrently...
Task completed with result: 200
Task 2 result: 200`,
        },
        {
          id: "level2-parallel-map",
          title: "Level 2: CPU-Bound Parallel Batch Processing (Parallel Map)",
          description: "Distribute computationally heavy array batches across multiple threads and gather results concurrently:",
          code: {
            language: "np",
            filename: "level2_parallel_map.np",
            code: `import threads

func process_chunk(items) -> int:
    int sum = 0
    for x in items:
        sum = sum + (x * x)
    return sum

func main():
    # Large data partitioned into chunks
    chunk_a := [10, 20, 30]
    chunk_b := [40, 50, 60]
    chunk_c := [70, 80, 90]
    
    print("Spawning parallel workers across CPU cores...")
    task_a := threads.run(process_chunk, chunk_a)
    task_b := threads.run(process_chunk, chunk_b)
    task_c := threads.run(process_chunk, chunk_c)
    
    # Wait and accumulate partial results
    int total = task_a.wait() + task_b.wait() + task_c.wait()
    print("Aggregated Parallel Sum:", total)

main()`,
          },
          output: `Spawning parallel workers across CPU cores...
Aggregated Parallel Sum: 28500`,
        },
        {
          id: "level3-race-conditions",
          title: "Level 3: Race Condition Prevention & Memory Model Trade-offs",
          description: "Configurable memory safety: choose between raw C-speed pointer sharing or 100% race-condition-free isolated execution:",
          points: [
            "Shared Execution (isolated = false, Default): Pointer sharing with zero-copy overhead. Blazing fast native C-speed. Ideal for read-only datasets or when maximum throughput is critical. However, concurrent mutations to shared collections require careful design to avoid race conditions.",
            "Isolated Execution (isolated = true): Shared-Nothing architecture. The NP runtime recursively deep-clones all arguments before spawning the thread. The worker receives an isolated replica in separate memory. Mutations made by the worker NEVER affect the caller, completely eliminating race conditions.",
            "Overhead Trade-off: Deep-cloning massive datasets (e.g., 100 million items or high-resolution video frames) consumes memory allocations and CPU copying time. In languages like Dart, 'Transferable / Move semantics' transfer pointer ownership to avoid copies. In NP, the isolated flag gives you explicit control: use isolated=false for zero-copy read pipelines, and isolated=true when safe state isolation is mandatory.",
          ],
          callout: {
            type: "warning",
            title: "Architectural Guideline",
            text: "Default to isolated=false for read-heavy operations to achieve peak C-level memory speed. Enable isolated=true whenever passing mutable arrays or dictionaries that the worker will alter independently.",
          },
          code: {
            language: "np",
            filename: "level3_memory_isolation.np",
            code: `import threads

func mutate_dataset(items) -> int:
    items.append(9999)
    return items.len()

func main():
    # --- Case A: Isolated Execution (isolated = true) ---
    print("=== Case A: Isolated Execution ===")
    safe_list := [1, 2, 3]
    print("Caller list before:", safe_list)
    
    task_iso := threads.run(mutate_dataset, safe_list, isolated = true)
    iso_len := task_iso.wait()
    
    print("Worker sees length:", iso_len)
    print("Caller list after (unmodified!):", safe_list)
    
    # --- Case B: Shared Execution (isolated = false, default) ---
    print("\n=== Case B: Shared Execution (C-Speed / Zero Copy) ===")
    shared_list := [10, 20, 30]
    print("Caller list before:", shared_list)
    
    task_shared := threads.run(mutate_dataset, shared_list)
    shared_len := task_shared.wait()
    
    print("Worker sees length:", shared_len)
    print("Caller list after (modified in-place):", shared_list)

main()`,
          },
          output: `=== Case A: Isolated Execution ===
Caller list before: [1, 2, 3]
Worker sees length: 4
Caller list after (unmodified!): [1, 2, 3]

=== Case B: Shared Execution (C-Speed / Zero Copy) ===
Caller list before: [10, 20, 30]
Worker sees length: 4
Caller list after (modified in-place): [10, 20, 30, 9999]`,
        },
        {
          id: "level4-pipeline",
          title: "Level 4: Advanced Multi-Stage Concurrent Pipeline",
          description: "Building a multi-stage high-throughput concurrent pipeline (Producer -> Worker Pool -> Aggregator):",
          code: {
            language: "np",
            filename: "level4_pipeline.np",
            code: `import threads
import time

# Stage 1: Batch Filter & Normalize Worker
func filter_and_scale(batch, int multiplier) -> int:
    int local_sum = 0
    for val in batch:
        if val > 10:
            local_sum = local_sum + (val * multiplier)
    return local_sum

func main():
    print("Starting Multi-Stage Parallel Pipeline...")
    
    # Stage 0: Data partitioning
    batch1 := [5, 12, 18, 7]
    batch2 := [20, 8, 30, 4]
    batch3 := [15, 25, 2, 9]
    
    # Stage 1: Dispatched to worker pool with memory isolation
    t1 := threads.run(filter_and_scale, batch1, 2, isolated = true)
    t2 := threads.run(filter_and_scale, batch2, 2, isolated = true)
    t3 := threads.run(filter_and_scale, batch3, 2, isolated = true)
    
    # Stage 2: Aggregator collects results from futures
    int res1 = t1.wait()
    int res2 = t2.wait()
    int res3 = t3.wait()
    
    int grand_total = res1 + res2 + res3
    print("Batch 1 Sum:", res1)
    print("Batch 2 Sum:", res2)
    print("Batch 3 Sum:", res3)
    print("Pipeline Grand Total:", grand_total)

main()`,
          },
          output: `Starting Multi-Stage Parallel Pipeline...
Batch 1 Sum: 60
Batch 2 Sum: 100
Batch 3 Sum: 80
Pipeline Grand Total: 240`,
        },
      ],
    },
  },
  "gpu-computing": {
    title: "GPU Computing (LLVM + NVPTX)",
    slug: "gpu-computing",
    description: "Accelerate high-throughput numerical computation on NVIDIA GPUs using NP's LLVM IR, NVPTX target backend, and zero-dependency CUDA Driver API.",
    badge: "v1.1",
    category: "Advanced Features",
    content: {
      lead: "NP compiles GPU kernels directly into NVIDIA PTX assembly via LLVM's `nvptx64-nvidia-cuda` backend. The host orchestrator manages buffer transfers and kernel launches through the dynamic CUDA Driver API (`libcuda.so.1` on Linux/WSL and `nvcuda.dll` on Windows), requiring zero external toolchains like `nvcc`.",
      sections: [
        {
          id: "architecture",
          title: "LLVM IR + NVPTX Compilation Architecture",
          description: "When compiling an NP program containing GPU kernels, the compiler partitions the AST into two independent compilation pipelines:",
          points: [
            "**Host Pipeline**: Compiles main application logic, data collections, and standard I/O into standard CPU LLVM IR targeting the host processor (e.g. x86_64, aarch64).",
            "**Device Pipeline**: Isolates all `kernel func` declarations into a secondary LLVM Module configured with target triple `nvptx64-nvidia-cuda` and custom NVVM annotations.",
            "**PTX Assembly Emission**: Emits GPU bytecode (`.ptx`) using LLVM's `TargetMachine` and embeds it as a constant string (`__np_gpu_ptx_code`) inside the host executable.",
            "**Zero-Dependency Runtime**: Dispatches kernels via runtime dynamic loading (`dlopen`/`LoadLibrary`), running out-of-the-box on any system with NVIDIA Display Drivers installed.",
          ],
          callout: {
            type: "info",
            title: "Zero CUDA Toolkit Dependency",
            text: "You do not need `nvcc` or the 4GB NVIDIA CUDA Toolkit installed to compile or run GPU kernels in NP. NP emits pure PTX assembly via LLVM and communicates directly with the driver!",
          },
        },
        {
          id: "kernel-syntax",
          title: "The `kernel` Keyword & Function Syntax",
          description: "GPU kernel functions are defined using the `kernel func` (or `kernel fn`) prefix. Kernels execute on thousands of GPU threads in parallel and return `void`:",
          code: {
            language: "np",
            filename: "kernel_syntax.np",
            code: `import gpu

# Define a GPU kernel for element-wise vector addition
kernel func vec_add(a, b, c, n: int):
    # Compute 1D global thread index
    idx := gpu.thread_idx_x() + gpu.block_idx_x() * gpu.block_dim_x()
    
    # Boundary guard
    if idx < n:
        c[idx] = a[idx] + b[idx]`,
          },
          points: [
            "`kernel func` marks the function as a device entry point with `!nvvm.annotations` metadata (`!{ptr @func, !\"kernel\", i32 1}`).",
            "Kernel arguments can be arrays (`a`, `b`, `c`) or scalars (`n: int`).",
            "Array parameters in kernels are automatically lowered to device memory pointers.",
          ],
        },
        {
          id: "grid-block-model",
          title: "Grid, Block & Thread Coordinate Model",
          description: "NP maps thread hierarchy to native hardware LLVM NVVM intrinsics:",
          points: [
            "`gpu.thread_idx_x()` / `y` / `z`: Thread index within the current thread block (mapped to `@llvm.nvvm.read.ptx.sreg.tid.*`).",
            "`gpu.block_idx_x()` / `y`: Block index within the computation grid (mapped to `@llvm.nvvm.read.ptx.sreg.ctaid.*`).",
            "`gpu.block_dim_x()`: Number of threads per block (mapped to `@llvm.nvvm.read.ptx.sreg.ntid.x`).",
            "`gpu.grid_dim_x()`: Total number of blocks in the grid (mapped to `@llvm.nvvm.read.ptx.sreg.nctaid.x`).",
            "`gpu.sync_threads()`: Barrier synchronization ensuring all threads in the block reach the same point before continuing.",
          ],
        },
        {
          id: "memory-lifecycle",
          title: "Automated Host-Device Memory Lifecycle",
          description: "Calling `gpu.launch(...)` triggers NP's automated high-performance memory orchestrator:",
          points: [
            "1. **Device Allocation**: Allocates device VRAM buffers (`cuMemAlloc_v2`) for all array arguments.",
            "2. **Host-to-Device Copy**: Copies caller arrays to GPU memory (`cuMemcpyHtoD_v2`).",
            "3. **Kernel Dispatch**: Invokes `cuLaunchKernel` with the configured grid dimensions and block sizes.",
            "4. **Hardware Synchronization**: Waits for GPU completion (`cuCtxSynchronize`).",
            "5. **Device-to-Host Copy**: Copies results back directly into the caller's array in-place (`cuMemcpyDtoH_v2`).",
            "6. **Auto Cleanup**: Immediately deallocates intermediate device VRAM buffers (`cuMemFree_v2`).",
          ],
        },
      ],
    },
  },
  "stdlib-gpu": {
    title: "gpu Module (NVIDIA CUDA)",
    slug: "stdlib-gpu",
    description: "Standard library reference for hardware detection, thread coordinate intrinsics, and kernel execution on NVIDIA GPUs.",
    badge: "v1.1",
    category: "Standard Library Reference",
    content: {
      lead: "The `gpu` module exposes hardware diagnostics, device coordinates, and the `gpu.launch` runtime orchestrator.",
      sections: [
        {
          id: "device-discovery",
          title: "Hardware Discovery & Diagnostics",
          description: "Detect available NVIDIA GPUs and query device properties at runtime:",
          code: {
            language: "np",
            filename: "gpu_detect.np",
            code: `import gpu

func main():
    print("GPU Available:", gpu.is_available())
    print("GPU Device Count:", gpu.device_count())
    if gpu.is_available():
        print("Device 0 Name:", gpu.device_name(0))

main()`,
          },
          output: `GPU Available:
true
GPU Device Count:
1
Device 0 Name:
NVIDIA GeForce GTX 1650`,
          points: [
            "`gpu.is_available() -> bool`: Returns `true` if an NVIDIA GPU driver and compatible hardware are detected.",
            "`gpu.device_count() -> int`: Returns the total number of CUDA-capable GPUs available on the system.",
            "`gpu.device_name(int dev_id) -> string`: Returns the model name of the specified GPU index (e.g. `NVIDIA GeForce GTX 1650`).",
          ],
        },
        {
          id: "launch-api",
          title: "Kernel Launch API (`gpu.launch`)",
          description: "Dispatches a kernel to the GPU with customizable Grid and Block dimensions:",
          signature: "gpu.launch(kernel_func, grid=N, block=M, *args)",
          parameters: [
            { name: "kernel_func", type: "kernel", description: "Reference to the kernel function defined with 'kernel func'." },
            { name: "grid", type: "int", description: "Number of thread blocks in the grid (e.g. 4, 32, 128)." },
            { name: "block", type: "int", description: "Number of threads per block (typically 128, 256, 512, max 1024)." },
            { name: "args", type: "varargs", description: "Data arrays and scalar parameters passed to the kernel." },
          ],
          points: [
            "Named arguments `grid=...` and `block=...` can be placed anywhere in the argument list.",
            "Positional grid and block integers are also supported: `gpu.launch(kernel, grid, block, a, b, c, n)`.",
          ],
        },
        {
          id: "vec-add-example",
          title: "Full Example: 1024-Element Parallel Vector Addition",
          description: "A complete script performing vector addition on 1,024 elements across 4 blocks with 256 threads each:",
          code: {
            language: "np",
            filename: "test_gpu_vec_add.np",
            code: `import gpu

kernel func vec_add(a, b, c, n: int):
    idx := gpu.thread_idx_x() + gpu.block_idx_x() * gpu.block_dim_x()
    if idx < n:
        c[idx] = a[idx] + b[idx]

func main():
    print("Testing NVIDIA GPU Subsystem...")
    print("GPU Available:", gpu.is_available())
    print("GPU Count:", gpu.device_count())
    print("GPU Device 0:", gpu.device_name(0))

    int n = 2**10   # 1024 elements (Note: use ** for exponentiation, ^ is bitwise XOR)
    a := []
    b := []
    c := []
    for i in range(0, n):
        a.append(1.5)
        b.append(2.5)
        c.append(0.0)

    print("Launching GPU vec_add kernel with 4 blocks x 256 threads...")
    gpu.launch(vec_add, grid=4, block=256, a, b, c, n)

    print("Result c[0]:", c[0])
    print("Result c[512]:", c[512])
    print("Result c[1023]:", c[1023])

    assert c[0] == 4.0, "c[0] should be 4.0"
    assert c[512] == 4.0, "c[512] should be 4.0"
    assert c[1023] == 4.0, "c[1023] should be 4.0"
    print("GPU Vector Addition Passed!")

main()`,
          },
          output: `Testing NVIDIA GPU Subsystem...
GPU Available:
true
GPU Count:
1
GPU Device 0:
NVIDIA GeForce GTX 1650
Launching GPU vec_add kernel with 4 blocks x 256 threads...
Result c[0]:
4.0
Result c[512]:
4.0
Result c[1023]:
4.0
GPU Vector Addition Passed!`,
        },
        {
          id: "vec-mul-example",
          title: "Full Example: Element-Wise Vector Multiplication",
          description: "Demonstrating kernel reuse and mathematical multiplications on the GPU:",
          code: {
            language: "np",
            filename: "test_gpu_vec_mul.np",
            code: `import gpu

kernel func vec_mul(a, b, c, n: int):
    idx := gpu.thread_idx_x() + gpu.block_idx_x() * gpu.block_dim_x()
    if idx < n:
        c[idx] = a[idx] * b[idx]

func main():
    int n = 1024
    a := []
    b := []
    c := []
    for i in range(0, n):
        a.append(1.5)
        b.append(2.5)
        c.append(0.0)

    print("Launching GPU vec_mul kernel...")
    gpu.launch(vec_mul, grid=4, block=256, a, b, c, n)

    print("Mul Result c[0]:", c[0])
    print("Mul Result c[1023]:", c[1023])

    assert c[0] == 3.75, "c[0] should be 3.75"
    assert c[1023] == 3.75, "c[1023] should be 3.75"
    print("GPU Vector Multiplication Passed!")

main()`,
          },
          output: `Launching GPU vec_mul kernel...
Mul Result c[0]:
3.75
Mul Result c[1023]:
3.75
GPU Vector Multiplication Passed!`,
        },
      ],
    },
  },
};
