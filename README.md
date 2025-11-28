# path-mapper-json

A small library to turn an array of paths like the one below:

```js
const paths = ["Coding", "Coding/JS", "Coding/JS/Enum.ts", "Coding/JS/ForLoop.md", "Coding/TS", "Security", "Security/Easy/Example1.ts", "Security/Medium"];
```

...into a JSON structure made like this:

```js
[
    {
        "name": "Coding",
        "type": "tree",
        "children": [
            {
                "name": "JS",
                "type": "tree",
                "children": [
                    {
                        "name": "Enum.ts",
                        "type": "blob",
                        "children": []
                    },
                    {
                        "name": "ForLoop.md",
                        "type": "blob",
                        "children": []
                    }
                ]
            },
            {
                "name": "TS",
                "type": "tree",
                "children": []
            }
        ]
    },
    {
        "name": "Security",
        "type": "tree",
        "children": [
            {
                "name": "Easy",
                "type": "tree",
                "children": [
                    {
                        "name": "Example1.ts",
                        "type": "blob",
                        "children": []
                    }
                ]
            },
            {
                "name": "Medium",
                "type": "tree",
                "children": []
            }
        ]
    }
]
```