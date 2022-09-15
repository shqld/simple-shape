simple-shape
===

A simple function for building JSON Schema.


Basic Usage
--- 

```ts
import Ajv from "ajv"
import { shape } from 'simple-shape'

const ajv = new Ajv()

const Message = shape({
  id: Number,
  type: anyOf('short', 'long'),
  text: String,
})

// TypeOf<typeof Message> -> { id: number, type: 'short' | 'long', text: string }

const message = {
    id: 1,
    type: 'short',
    text: 'Hello, world!',
}

ajv.validate(shape, message);
```

For details: https://github.com/shqld/simple-shape/blob/main/example.ts
