
export function findNodes(tree, func) {
  const names = []
  const list = [...tree]
  const visitedSet = new Set()

  while (list.length) {
    const node = list[0]

    if (visitedSet.has(node)) {
      names.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node['children'] && list.unshift(...node['children'])
      names.push(node)

      if (func(node)) return names
    }
  }

  return null
}