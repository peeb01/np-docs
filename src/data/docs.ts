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
      description?: string;
      code?: {
        language: string;
        filename?: string;
        code: string;
      };
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
      { title: "Functions & Parameters", slug: "functions" },
    ],
  },
  {
    name: "Data Structures & OOP",
    items: [
      { title: "Arrays & Dictionaries", slug: "collections" },
      { title: "Custom Structs", slug: "structs" },
      { title: "Pythonic Comprehensions", slug: "comprehensions" },
    ],
  },
  {
    name: "Advanced Features",
    items: [
      { title: "Modules & Import System", slug: "modules" },
      { title: "128 & 256-Bit Integers", slug: "big-integers" },
      { title: "Exception Handling", slug: "exceptions" },
      { title: "LLVM Backend Architecture", slug: "architecture" },
    ],
  },
  {
    name: "Standard Library",
    items: [
      { title: "Standard Library Overview", slug: "stdlib" },
      { title: "os & sys Module", slug: "stdlib-os" },
      { title: "time & Clock Module", slug: "stdlib-time" },
      { title: "json & Serialization", slug: "stdlib-json" },
      { title: "regex & Pattern Engine", slug: "stdlib-regex" },
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
            "Automatic Memory Management (RAII): Primitive types are stack-allocated, while complex types use reference counting (std::shared_ptr) with zero GC pauses.",
            "Native Big Integers: Built-in support for 128-bit (int128) and software-implemented 256-bit (int256) signed integers.",
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

# Main entry point
Item apple = Item("Apple", 15)
Item orange = Item("Orange", 25)

array cart = [apple, orange]
int total_cost = calculate_total(cart)

print("Cart Total:", total_cost)

# Pythonic list comprehension
array doubled_prices = [item.price * 2 for item in cart]
print("Doubled Prices:", doubled_prices)`,
          },
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
          description: "The quickest way to run NP without installing LLVM or C++ toolchains on your host machine is using the official Alpine Docker image:",
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
curl -L -o np https://github.com/peeb01/np-compiler/releases/latest/download/np-linux-x86_64

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
git clone https://github.com/peeb01/np-compiler.git
cd np-compiler

# 2. Build using Make:
make re

# Or build using CMake:
cmake -B build
cmake --build build

# 3. Test the built executable:
./np tests/basic.np`,
          },
          callout: {
            type: "info",
            title: "Runtime Library Included",
            text: "The precompiled static runtime library (runtime/libnpruntime.a) is automatically linked when you build executables.",
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
    description: "Primitive types, dynamic variables, arithmetic, comparisons, and boolean logic.",
    content: {
      lead: "NP supports both strictly typed variables and dynamically typed variables with automatic memory management.",
      sections: [
        {
          id: "primitives",
          title: "Primitive Types",
          description: "Primitive types are stack-allocated and mapped directly to C++ primitives:",
          points: [
            "int, int32, int64: 64-bit signed integer (default: 0)",
            "float, float32, float64: 64-bit double-precision float (default: 0.0)",
            "bool: Boolean flag (true or false)",
            "string: UTF-8 dynamic string (std::string wrapper)",
            "array: Dynamic heap-allocated list (std::vector)",
            "dict: Key-value associative mapping (std::map)",
          ],
          code: {
            language: "np",
            filename: "types.np",
            code: `# Static variable declarations
int age = 25
float pi = 3.14159
string username = "Alice"
bool is_admin = true

# Dynamic variable declaration (var)
var dynamic_val = 100
dynamic_val = "Now holding a string!"
dynamic_val = [1, 2, 3]

print(username, "is", age, "years old")`,
          },
        },
        {
          id: "operators",
          title: "Operators & Math",
          description: "NP supports standard arithmetic, modulo, power (^), and logical operators:",
          code: {
            language: "np",
            filename: "operators.np",
            code: `int a = 10
int b = 3

print("Addition:", a + b)       # 13
print("Division:", a / b)       # 3 (integer division)
print("Modulo:", a % b)         # 1
print("Power:", 2 ^ 3)          # 8

# Logical operators: and, or, not
bool x = true
bool y = false
print(x and not y)              # true`,
          },
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
    print("Count:", count)
    count = count + 1

# Range-based for loop
for i in range(0, 4):
    print("Range Index:", i)

# Collection iterator loop
array fruits = ["Apple", "Banana", "Cherry"]
for item in fruits:
    print("Fruit:", item)`,
          },
        },
      ],
    },
  },

  functions: {
    title: "Functions & Parameters",
    slug: "functions",
    category: "Language Fundamentals",
    description: "Declaring functions with fn, argument types, return types, and default values.",
    content: {
      lead: "Functions are defined using the fn keyword followed by parameter signatures and an optional return type arrow (->).",
      sections: [
        {
          id: "func-syntax",
          title: "Defining Functions",
          code: {
            language: "np",
            filename: "functions.np",
            code: `# Function with typed arguments and return type
fn add(int x, int y) -> int:
    return x + y

# Function without return value (void)
fn greet(string name):
    print("Hello,", name)

# Recursive function
fn factorial(int n) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

greet("Developer")
int sum = add(15, 25)
print("15 + 25 =", sum)
print("Factorial of 5 =", factorial(5))`,
          },
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
          id: "arrays-dicts",
          title: "Creating & Accessing Collections",
          code: {
            language: "np",
            filename: "collections.np",
            code: `# Dynamic array
array numbers = [10, 20, 30, 40]
numbers.append(50)
print("First element:", numbers[0])
print("Array length:", len(numbers))

# Associative dictionary
dict user = {
    "name": "Bob",
    "role": "Engineer",
    "active": true
}
print("User Name:", user["name"])

# Updating dictionary
user["role"] = "Lead Architect"
print("Updated Role:", user["role"])`,
          },
        },
      ],
    },
  },

  structs: {
    title: "Custom Structs",
    slug: "structs",
    category: "Data Structures & OOP",
    description: "Defining custom data models with named fields, automatic constructors, and dot-notation access.",
    content: {
      lead: "Structs provide structured data modeling. The NP compiler automatically generates constructors and enables dot-notation field access.",
      sections: [
        {
          id: "declaring-structs",
          title: "Declaring and Instantiating Structs",
          code: {
            language: "np",
            filename: "structs.np",
            code: `# Define a struct with typed fields
struct Point:
    float x
    float y

struct User:
    int id
    string name
    bool is_active
    Point location

# Automatic constructor instantiation
Point pt = Point(10.5, 20.0)
User u = User(1001, "Alice", true, pt)

# Access fields via dot-notation
print("User ID:", u.id)
print("User Name:", u.name)
print("Location X:", u.location.x)

# Mutating struct fields
u.name = "Alice Wonder"
print("Updated Name:", u.name)`,
          },
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
          code: {
            language: "np",
            filename: "comprehensions.np",
            code: `# Basic List Comprehension
array numbers = [x * 2 for x in range(1, 6)]
print("Doubled:", numbers)  # [2, 4, 6, 8, 10]

# List Comprehension with Filter condition
array evens = [x for x in numbers if x > 5]
print("Filtered > 5:", evens)  # [6, 8, 10]

# Dictionary Comprehension
dict squares = {x: x * x for x in range(1, 5)}
print("Squares Dict:", squares)`,
          },
        },
      ],
    },
  },

  modules: {
    title: "Modules & Import System",
    slug: "modules",
    category: "Advanced Features",
    description: "Organizing code across files and packages with clean imports and grouped parentheses.",
    content: {
      lead: "NP supports package modularity with clean paths, aliases, and grouped imports without requiring .np file extensions.",
      sections: [
        {
          id: "imports",
          title: "Using the Import System",
          code: {
            language: "np",
            filename: "main.np",
            code: `# Import single standard module
import "time"

# Grouped imports
import (
    "json"
    "sys"
    mh "./math_helper"
)

# Use imported package functions
print("CPU Architecture:", sys.arch())
print("Time now:", time.now_ms())`,
          },
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
          code: {
            language: "np",
            filename: "bigint.np",
            code: `# 128-bit integer (maps to GCC __int128)
int128 huge_num = 170141183460469231731687303715884105727

# 256-bit software integer
int256 crypto_val = 115792089237316195423570985008687907853269984665640564039457584007913129639935

print("128-bit value:", huge_num)
print("256-bit value:", crypto_val)`,
          },
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
          code: {
            language: "np",
            filename: "exceptions.np",
            code: `try:
    int a = 10
    int b = 0
    int c = a / b
    print("Result:", c)
except:
    print("Error caught: Division by zero handled safely!")

print("Program continues executing normally.")`,
          },
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
            "1. Lexer (core/lexer.cpp): Scans source code into tokens with source position tracking.",
            "2. AST Parser (core/parser.cpp): Hand-written recursive descent parser building an Abstract Syntax Tree.",
            "3. LLVM CodeGen (core/llvm_codegen.cpp): Generates LLVM SSA IR with function optimization passes (-O3).",
            "4. Target Emission & Linker: Emits temporary object file (.o) and links with runtime/libnpruntime.a using g++.",
          ],
        },
      ],
    },
  },

  stdlib: {
    title: "Standard Library Overview",
    slug: "stdlib",
    category: "Standard Library",
    description: "Built-in utility functions, file operations, time measurement, and data formatting.",
    content: {
      lead: "NP ships with standard library modules linked directly with the compiler runtime.",
      sections: [
        {
          id: "builtin-modules",
          title: "Built-in Modules",
          points: [
            "os: File I/O, file existence checks, and process environment variables",
            "sys: CPU core inspection, platform architecture, OS identification",
            "time: High-resolution monotonic timers, sleep utilities, and timestamps",
            "json: Fast JSON parsing and string serialization",
            "regex: Regular expression pattern testing and text matching",
          ],
        },
      ],
    },
  },

  "stdlib-os": {
    title: "os & sys Module",
    slug: "stdlib-os",
    category: "Standard Library",
    description: "File manipulation, process management, and CPU hardware inspection.",
    content: {
      lead: "The os and sys modules allow interaction with the operating system and system hardware.",
      sections: [
        {
          id: "os-examples",
          title: "File Operations & System Info",
          code: {
            language: "np",
            filename: "system.np",
            code: `import "os"
import "sys"

# Inspect hardware
print("Platform OS:", sys.os_name())
print("CPU Architecture:", sys.arch())
print("CPU Cores:", sys.num_cpus())

# File operations
string filename = "notes.txt"
os.write_file(filename, "Compiled natively with NP\\n")

if os.exists(filename):
    string content = os.read_file(filename)
    print("File Content:", content)`,
          },
        },
      ],
    },
  },

  "stdlib-time": {
    title: "time & Clock Module",
    slug: "stdlib-time",
    category: "Standard Library",
    description: "High-resolution monotonic timers and execution benchmarking.",
    content: {
      lead: "Measure runtime latency and manage sleep durations.",
      sections: [
        {
          id: "time-examples",
          title: "Measuring Execution Time",
          code: {
            language: "np",
            filename: "timer.np",
            code: `import "time"

int start = time.now_ms()

# Simulate work
time.sleep(20)

int elapsed = time.now_ms() - start
print("Elapsed milliseconds:", elapsed)`,
          },
        },
      ],
    },
  },

  "stdlib-json": {
    title: "json & Serialization",
    slug: "stdlib-json",
    category: "Standard Library",
    description: "JSON parsing and data serialization.",
    content: {
      lead: "Easily parse JSON strings and serialize dictionary objects.",
      sections: [
        {
          id: "json-examples",
          title: "Parsing & Accessing JSON",
          code: {
            language: "np",
            filename: "json_demo.np",
            code: `import "json"

string payload = "{\\"name\\": \\"NP\\", \\"version\\": \\"1.1\\"}"

dict data = json.parse(payload)
print("Language:", data["name"])
print("Version:", data["version"])`,
          },
        },
      ],
    },
  },

  "stdlib-regex": {
    title: "regex & Pattern Engine",
    slug: "stdlib-regex",
    category: "Standard Library",
    description: "Regular expression pattern validation and string matching.",
    content: {
      lead: "Fast pattern matching for data validation.",
      sections: [
        {
          id: "regex-examples",
          title: "Pattern Testing",
          code: {
            language: "np",
            filename: "regex_demo.np",
            code: `import "regex"

string email = "test@example.com"
string pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

if regex.matches(pattern, email):
    print("Email is valid!")
else:
    print("Invalid email format.")`,
          },
        },
      ],
    },
  },
};
