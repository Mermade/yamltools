# YAMLtools

![ci](https://github.com/Mermade/yamltools/workflows/ci/badge.svg)

## parseWithComments

This function takes a YAML string and an optional `commentProperty`, which defaults to `$comment`.

Comments in the YAML string are preserved in the JSON object using the `commentProperty` name.

## stringifyWithComments

This function takes a JSON object and an optional `commentProperty`, which defaults to `$comment`.

Properties in the JSON object with the name of the `commentProperty` are stringified as YAML comments.

## parseWithAliases

This function returns an object with a `data` property containing the parsed object, and an `aliases` property
containing a Map of YAML aliases to their object representations.

## Limitations

Because JSON objects cannot contain duplicate keys, comments may get concatenated when parsing.

Comments are not guaranteed to be attached to the same node when roundtripping.

