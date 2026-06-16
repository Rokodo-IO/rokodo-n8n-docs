---
id: arrays
title: Arrays
sidebar_label: Arrays
---

# Arrays

Dans n8n, les tableaux peuvent apparaître à deux niveaux différents :

1. **Un tableau dans un champ JSON**  
   Exemple : `$json.items`

2. **Une liste d’items n8n**  
   Chaque item est traité individuellement par les nodes.

Exemple de tableau dans un champ JSON :

```json
{
  "items": [
    {
      "name": "Product A",
      "price": 10
    },
    {
      "name": "Product B",
      "price": 20
    }
  ]
}
```

Expression n8n :

```n8n
{{ $json.items }}
```

Exemple avec transformation :

```n8n
{{ $json.items.map(item => item.name) }}
```

Output :

```json
["Product A", "Product B"]
```

:::info
Une expression n8n s’écrit avec `{{ ... }}` dans les paramètres des nodes.  
Dans le **Code node**, on écrit du JavaScript directement, sans `{{ ... }}`.
:::

---

## Array field vs n8n items

Il faut distinguer :

### Array field

Un champ JSON contient un tableau.

Input :

```json
{
  "items": ["A", "B", "C"]
}
```

Expression :

```n8n
{{ $json.items.length }}
```

Output :

```text
3
```

---

### n8n items

n8n traite souvent une liste d’items séparés.

Input n8n :

```json
[
  {
    "json": {
      "name": "A"
    }
  },
  {
    "json": {
      "name": "B"
    }
  }
]
```

Dans un node classique, l’expression suivante est évaluée pour **l’item courant** :

```n8n
{{ $json.name }}
```

Output item 1 :

```text
A
```

Output item 2 :

```text
B
```

:::tip
Pour transformer un tableau contenu dans un champ, utiliser les expressions array.  
Pour transformer plusieurs items n8n, utiliser souvent les nodes **Split Out**, **Aggregate**, **Code**, **Merge** ou **Item Lists** selon le besoin.
:::

---

## Fonctions disponibles

| Name | Description |
| --- | --- |
| [Length](#length)(Array) | Retourne le nombre d’éléments. |
| [First](#first)(Array) | Retourne le premier élément. |
| [Last](#last)(Array) | Retourne le dernier élément. |
| [GetByIndex](#getbyindex)(Array, Integer) | Retourne l’élément à un index donné. |
| [Includes](#includes)(Array, Any) | Vérifie si un tableau contient une valeur. |
| [Join](#join)(Array, Text) | Convertit un tableau en texte. |
| [Map](#map)(Array, Function) | Transforme chaque élément du tableau. |
| [Filter](#filter)(Array, Function) | Garde uniquement les éléments qui respectent une condition. |
| [Find](#find)(Array, Function) | Retourne le premier élément qui respecte une condition. |
| [Some](#some)(Array, Function) | Retourne `true` si au moins un élément respecte une condition. |
| [Every](#every)(Array, Function) | Retourne `true` si tous les éléments respectent une condition. |
| [Reduce](#reduce)(Array, Function) | Réduit le tableau à une seule valeur. |
| [Sum](#sum)(Array) | Retourne la somme des nombres. |
| [Average](#average)(Array) | Retourne la moyenne des nombres. |
| [Min](#min)(Array) | Retourne la plus petite valeur. |
| [Max](#max)(Array) | Retourne la plus grande valeur. |
| [Append](#append)(Array, Any) | Ajoute des éléments à la fin du tableau. |
| [Concat](#concat)(Array, Array) | Fusionne plusieurs tableaux. |
| [Compact](#compact)(Array) | Supprime les valeurs vides. |
| [RemoveDuplicates](#removeduplicates)(Array) | Supprime les doublons. |
| [Difference](#difference)(Array, Array) | Retourne les éléments absents d’un autre tableau. |
| [Sort](#sort)(Array) | Trie un tableau. |
| [Reverse](#reverse)(Array) | Inverse l’ordre des éléments. |
| [Slice](#slice)(Array, Integer, Integer) | Extrait une partie du tableau. |
| [Chunk](#chunk)(Array, Integer) | Découpe un tableau en sous-tableaux. |
| [Pluck](#pluck)(Array, Text) | Extrait une propriété depuis chaque objet. |
| [RandomItem](#randomitem)(Array) | Retourne un élément aléatoire. |
| [IsEmpty](#isempty)(Array) | Vérifie si un tableau est vide. |
| [ToJsonString](#tojsonstring)(Array) | Convertit un tableau en chaîne JSON. |

---

## Length

Retourne le nombre d’éléments du tableau.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- HTTP Request node fields: Yes
- Code node: Yes, en JavaScript

### Syntax

```n8n
{{ array.length }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau à mesurer.

### Output

Type: Integer

### Examples

```n8n
{{ ["A", "B", "C"].length }}
```

Output:

```text
3
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).length }}
```

---

## First

Retourne le premier élément du tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.first() }}
```

Alternative JavaScript :

```n8n
{{ array[0] }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

### Output

Type: Any

### Examples

```n8n
{{ ["A", "B", "C"].first() }}
```

Output:

```text
A
```

Alternative :

```n8n
{{ ["A", "B", "C"][0] }}
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).first() }}
```

---

## Last

Retourne le dernier élément du tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.last() }}
```

Alternative JavaScript :

```n8n
{{ array[array.length - 1] }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

### Output

Type: Any

### Examples

```n8n
{{ ["A", "B", "C"].last() }}
```

Output:

```text
C
```

Alternative :

```n8n
{{ ["A", "B", "C"][["A", "B", "C"].length - 1] }}
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).last() }}
```

---

## GetByIndex

Retourne un élément à partir de son index.

:::info
Les index JavaScript commencent à `0`.
:::

### Syntax

```n8n
{{ array[index] }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

index
: Type: Integer. Mandatory.  
Position de l’élément à récupérer.

### Output

Type: Any

### Examples

```n8n
{{ ["A", "B", "C"][1] }}
```

Output:

```text
B
```

Avec sécurité :

```n8n
{{ ($json.items ?? [])[0] ?? null }}
```

---

## Includes

Vérifie si un tableau contient une valeur.

### Syntax

```n8n
{{ array.includes(value) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

value
: Type: Any. Mandatory.  
Valeur recherchée.

### Output

Type: Boolean

### Examples

```n8n
{{ ["A", "B", "C"].includes("B") }}
```

Output:

```json
true
```

```n8n
{{ ["A", "B", "C"].includes("X") }}
```

Output:

```json
false
```

Avec un champ JSON :

```n8n
{{ ($json.tags ?? []).includes("vip") }}
```

---

## Join

Convertit un tableau en texte.

### Syntax

```n8n
{{ array.join(separator) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

separator
: Type: Text. Optional.  
Séparateur utilisé entre les éléments.

### Output

Type: Text

### Examples

```n8n
{{ ["A", "B", "C"].join(", ") }}
```

Output:

```text
A, B, C
```

Avec un champ JSON :

```n8n
{{ ($json.tags ?? []).join(", ") }}
```

---

## Map

Transforme chaque élément d’un tableau.

### Syntax

```n8n
{{ array.map(item => expression) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

item
: Type: Any. Mandatory.  
Élément courant.

### Output

Type: Array

### Examples

```n8n
{{ [1, 2, 3].map(n => n * 2) }}
```

Output:

```json
[2, 4, 6]
```

Avec un tableau d’objets :

```n8n
{{ $json.items.map(item => item.name) }}
```

Input:

```json
{
  "items": [
    {
      "name": "Product A",
      "price": 10
    },
    {
      "name": "Product B",
      "price": 20
    }
  ]
}
```

Output:

```json
["Product A", "Product B"]
```

Avec protection :

```n8n
{{ ($json.items ?? []).map(item => item.name ?? "Unnamed") }}
```

---

## Filter

Garde uniquement les éléments qui respectent une condition.

### Syntax

```n8n
{{ array.filter(item => condition) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

condition
: Type: Function. Mandatory.  
Condition qui retourne `true` ou `false`.

### Output

Type: Array

### Examples

```n8n
{{ [1, 2, 3, 4].filter(n => n > 2) }}
```

Output:

```json
[3, 4]
```

Avec un tableau d’objets :

```n8n
{{ ($json.items ?? []).filter(item => item.active === true) }}
```

Avec prix supérieur à 100 :

```n8n
{{ ($json.items ?? []).filter(item => Number(item.price ?? 0) > 100) }}
```

---

## Find

Retourne le premier élément qui respecte une condition.

### Syntax

```n8n
{{ array.find(item => condition) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

condition
: Type: Function. Mandatory.  
Condition qui retourne `true` ou `false`.

### Output

Type: Any

### Examples

```n8n
{{ [1, 2, 3, 4].find(n => n > 2) }}
```

Output:

```text
3
```

Avec un tableau d’objets :

```n8n
{{ ($json.items ?? []).find(item => item.sku === "ABC-123") }}
```

Récupérer seulement le prix :

```n8n
{{ (($json.items ?? []).find(item => item.sku === "ABC-123") ?? {}).price ?? null }}
```

---

## Some

Retourne `true` si au moins un élément respecte une condition.

### Syntax

```n8n
{{ array.some(item => condition) }}
```

### Output

Type: Boolean

### Examples

```n8n
{{ [1, 2, 3].some(n => n > 2) }}
```

Output:

```json
true
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).some(item => item.active === true) }}
```

---

## Every

Retourne `true` si tous les éléments respectent une condition.

### Syntax

```n8n
{{ array.every(item => condition) }}
```

### Output

Type: Boolean

### Examples

```n8n
{{ [1, 2, 3].every(n => n > 0) }}
```

Output:

```json
true
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).every(item => item.status === "paid") }}
```

---

## Reduce

Réduit un tableau à une seule valeur.

### Syntax

```n8n
{{ array.reduce((acc, item) => expression, initialValue) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

acc
: Type: Any. Mandatory.  
Accumulateur.

item
: Type: Any. Mandatory.  
Élément courant.

initialValue
: Type: Any. Mandatory.  
Valeur initiale.

### Output

Type: Any

### Examples

Somme simple :

```n8n
{{ [1, 2, 3].reduce((sum, n) => sum + n, 0) }}
```

Output:

```text
6
```

Somme d’un panier :

```n8n
{{ ($json.items ?? []).reduce((sum, item) => sum + Number(item.price ?? 0), 0) }}
```

Compter les éléments actifs :

```n8n
{{ ($json.items ?? []).reduce((count, item) => count + (item.active ? 1 : 0), 0) }}
```

---

## Sum

Retourne la somme des nombres d’un tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.sum() }}
```

Alternative JavaScript :

```n8n
{{ array.reduce((sum, n) => sum + n, 0) }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau de nombres.

### Output

Type: Number

### Examples

```n8n
{{ [1, 2, 3].sum() }}
```

Output:

```text
6
```

Avec un tableau d’objets :

```n8n
{{ ($json.items ?? []).map(item => Number(item.price ?? 0)).sum() }}
```

---

## Average

Retourne la moyenne des nombres d’un tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.average() }}
```

Alternative JavaScript :

```n8n
{{ array.length ? array.reduce((sum, n) => sum + n, 0) / array.length : 0 }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau de nombres.

### Output

Type: Number

### Examples

```n8n
{{ [12, 1, 5].average() }}
```

Output:

```text
6
```

Avec un tableau d’objets :

```n8n
{{ ($json.items ?? []).map(item => Number(item.score ?? 0)).average() }}
```

:::warning
`average()` attend un tableau de nombres.  
Si le tableau contient des valeurs non numériques, l’expression peut échouer.
:::

---

## Min

Retourne la plus petite valeur d’un tableau numérique.

### Syntax

```n8n
{{ Math.min(...array) }}
```

### Output

Type: Number

### Examples

```n8n
{{ Math.min(...[10, 3, 25, -2]) }}
```

Output:

```text
-2
```

Avec un champ JSON :

```n8n
{{ Math.min(...(($json.items ?? []).map(item => Number(item.price ?? 0)))) }}
```

---

## Max

Retourne la plus grande valeur d’un tableau numérique.

### Syntax

```n8n
{{ Math.max(...array) }}
```

### Output

Type: Number

### Examples

```n8n
{{ Math.max(...[10, 3, 25, -2]) }}
```

Output:

```text
25
```

Avec un champ JSON :

```n8n
{{ Math.max(...(($json.items ?? []).map(item => Number(item.price ?? 0)))) }}
```

---

## Append

Ajoute un ou plusieurs éléments à la fin du tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.append(value) }}
```

Alternative recommandée JavaScript :

```n8n
{{ [...array, value] }}
```

### Parameters

array
: Type: Array. Mandatory.  
Tableau source.

value
: Type: Any. Mandatory.  
Valeur à ajouter.

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B"].append("C") }}
```

Output:

```json
["A", "B", "C"]
```

Avec spread syntax :

```n8n
{{ [...($json.tags ?? []), "new"] }}
```

---

## Concat

Fusionne plusieurs tableaux.

### Syntax

```n8n
{{ array1.concat(array2) }}
```

Ou :

```n8n
{{ [...array1, ...array2] }}
```

### Parameters

array1
: Type: Array. Mandatory.  
Premier tableau.

array2
: Type: Array. Mandatory.  
Deuxième tableau.

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B"].concat(["C", "D"]) }}
```

Output:

```json
["A", "B", "C", "D"]
```

Avec des champs JSON :

```n8n
{{ [...($json.tags ?? []), ...($json.extraTags ?? [])] }}
```

---

## Compact

Supprime les valeurs vides du tableau.

Dans n8n, `compact()` supprime notamment :

- `null`
- `""`
- `undefined`

### Syntax

```n8n
{{ array.compact() }}
```

### Output

Type: Array

### Examples

```n8n
{{ [2, null, 1, ""].compact() }}
```

Output:

```json
[2, 1]
```

Avec un champ JSON :

```n8n
{{ ($json.values ?? []).compact() }}
```

---

## RemoveDuplicates

Supprime les doublons.

### Syntax

Méthode n8n :

```n8n
{{ array.removeDuplicates() }}
```

Alternative JavaScript :

```n8n
{{ [...new Set(array)] }}
```

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B", "A"].removeDuplicates() }}
```

Output:

```json
["A", "B"]
```

Alternative :

```n8n
{{ [...new Set(["A", "B", "A"])] }}
```

Avec un champ JSON :

```n8n
{{ ($json.tags ?? []).removeDuplicates() }}
```

---

## Difference

Retourne les éléments du premier tableau qui ne sont pas présents dans le second.

### Syntax

Méthode n8n :

```n8n
{{ array1.difference(array2) }}
```

Alternative JavaScript :

```n8n
{{ array1.filter(value => !array2.includes(value)) }}
```

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B", "C"].difference(["B"]) }}
```

Output:

```json
["A", "C"]
```

Alternative :

```n8n
{{ ["A", "B", "C"].filter(value => !["B"].includes(value)) }}
```

Avec champs JSON :

```n8n
{{ ($json.tags ?? []).difference($json.excludedTags ?? []) }}
```

---

## Sort

Trie un tableau.

### Syntax

```n8n
{{ array.sort() }}
```

Pour les nombres :

```n8n
{{ array.sort((a, b) => a - b) }}
```

Pour les objets :

```n8n
{{ array.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```

### Output

Type: Array

### Examples

```n8n
{{ ["B", "C", "A"].sort() }}
```

Output:

```json
["A", "B", "C"]
```

Nombres croissants :

```n8n
{{ [10, 2, 30].sort((a, b) => a - b) }}
```

Output:

```json
[2, 10, 30]
```

Objets par prix :

```n8n
{{ ($json.items ?? []).sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```

:::warning
`sort()` modifie le tableau original.  
Pour éviter cet effet de bord, utiliser une copie :

```n8n
{{ [...($json.items ?? [])].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```
:::

---

## Reverse

Inverse l’ordre d’un tableau.

### Syntax

```n8n
{{ array.reverse() }}
```

Sans modifier l’original :

```n8n
{{ [...array].reverse() }}
```

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B", "C"].reverse() }}
```

Output:

```json
["C", "B", "A"]
```

Avec copie :

```n8n
{{ [...($json.items ?? [])].reverse() }}
```

---

## Slice

Extrait une partie du tableau.

### Syntax

```n8n
{{ array.slice(start, end) }}
```

### Parameters

start
: Type: Integer. Mandatory.  
Index de départ inclus.

end
: Type: Integer. Optional.  
Index de fin exclu.

### Output

Type: Array

### Examples

```n8n
{{ ["A", "B", "C", "D"].slice(1, 3) }}
```

Output:

```json
["B", "C"]
```

Top 3 :

```n8n
{{ ($json.items ?? []).slice(0, 3) }}
```

---

## Chunk

Découpe un tableau en sous-tableaux.

### Syntax

Méthode n8n :

```n8n
{{ array.chunk(length) }}
```

### Parameters

length
: Type: Integer. Mandatory.  
Nombre d’éléments par groupe.

### Output

Type: Array

### Examples

```n8n
{{ [1, 2, 3, 4, 5, 6].chunk(2) }}
```

Output:

```json
[[1, 2], [3, 4], [5, 6]]
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).chunk(10) }}
```

---

## Pluck

Extrait une propriété depuis chaque objet du tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.pluck('fieldName') }}
```

Alternative JavaScript :

```n8n
{{ array.map(item => item.fieldName) }}
```

### Parameters

fieldName
: Type: Text. Mandatory.  
Nom de la propriété à extraire.

### Output

Type: Array

### Examples

```n8n
{{ [{ name: "A" }, { name: "B" }].pluck("name") }}
```

Output:

```json
["A", "B"]
```

Alternative :

```n8n
{{ [{ name: "A" }, { name: "B" }].map(item => item.name) }}
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).pluck("name") }}
```

---

## RandomItem

Retourne un élément aléatoire du tableau.

### Syntax

Méthode n8n :

```n8n
{{ array.randomItem() }}
```

Alternative JavaScript :

```n8n
{{ array[Math.floor(Math.random() * array.length)] }}
```

### Output

Type: Any

### Examples

```n8n
{{ ["A", "B", "C"].randomItem() }}
```

Output possible:

```text
B
```

Avec sécurité :

```n8n
{{ ($json.items ?? []).length ? ($json.items ?? []).randomItem() : null }}
```

---

## IsEmpty

Vérifie si un tableau est vide.

### Syntax

Méthode n8n :

```n8n
{{ array.isEmpty() }}
```

Alternative JavaScript :

```n8n
{{ array.length === 0 }}
```

### Output

Type: Boolean

### Examples

```n8n
{{ [].isEmpty() }}
```

Output:

```json
true
```

```n8n
{{ ["A"].isEmpty() }}
```

Output:

```json
false
```

Avec un champ JSON :

```n8n
{{ ($json.items ?? []).length === 0 }}
```

---

## ToJsonString

Convertit un tableau en chaîne JSON.

### Syntax

```n8n
{{ JSON.stringify(array) }}
```

### Output

Type: Text

### Examples

```n8n
{{ JSON.stringify(["A", "B", "C"]) }}
```

Output:

```text
["A","B","C"]
```

Avec indentation :

```n8n
{{ JSON.stringify($json.items ?? [], null, 2) }}
```

---

## Common patterns

### Nombre d’éléments

```n8n
{{ ($json.items ?? []).length }}
```

### Premier élément

```n8n
{{ ($json.items ?? [])[0] ?? null }}
```

### Dernier élément

```n8n
{{ ($json.items ?? []).length ? $json.items[$json.items.length - 1] : null }}
```

### Liste des noms

```n8n
{{ ($json.items ?? []).map(item => item.name ?? "Unnamed") }}
```

### Liste des noms en texte

```n8n
{{ ($json.items ?? []).map(item => item.name ?? "Unnamed").join(", ") }}
```

### Filtrer les éléments actifs

```n8n
{{ ($json.items ?? []).filter(item => item.active === true) }}
```

### Trouver un élément par SKU

```n8n
{{ ($json.items ?? []).find(item => item.sku === "ABC-123") ?? null }}
```

### Somme des prix

```n8n
{{ ($json.items ?? []).reduce((sum, item) => sum + Number(item.price ?? 0), 0) }}
```

### Moyenne des scores

```n8n
{{ (() => {
  const scores = ($json.items ?? []).map(item => Number(item.score ?? 0));
  return scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
})() }}
```

### Supprimer les doublons

```n8n
{{ [...new Set($json.tags ?? [])] }}
```

### Trier par prix croissant

```n8n
{{ [...($json.items ?? [])].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```

### Top 5 par score décroissant

```n8n
{{ [...($json.items ?? [])].sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0)).slice(0, 5) }}
```

### Vérifier si tous les items sont payés

```n8n
{{ ($json.items ?? []).every(item => item.status === "paid") }}
```

### Vérifier si au moins un item est en erreur

```n8n
{{ ($json.items ?? []).some(item => item.status === "error") }}
```

---

## Usage in Edit Fields / Set node

Exemple de configuration dans un node **Edit Fields** ou **Set** :

```json
{
  "items_count": "{{ ($json.items ?? []).length }}",
  "first_item": "{{ ($json.items ?? [])[0] ?? null }}",
  "item_names": "{{ ($json.items ?? []).map(item => item.name ?? \"Unnamed\") }}",
  "item_names_text": "{{ ($json.items ?? []).map(item => item.name ?? \"Unnamed\").join(\", \") }}",
  "active_items": "{{ ($json.items ?? []).filter(item => item.active === true) }}",
  "total_price": "{{ ($json.items ?? []).reduce((sum, item) => sum + Number(item.price ?? 0), 0) }}",
  "unique_tags": "{{ [...new Set($json.tags ?? [])] }}"
}
```

---

## Usage in Code node

Pour des transformations plus longues, utiliser le **Code node**.

Mode recommandé pour cet exemple : **Run Once for Each Item**.

```javascript
const items = Array.isArray($json.items) ? $json.items : [];
const tags = Array.isArray($json.tags) ? $json.tags : [];

const itemNames = items.map((item) => item.name ?? 'Unnamed');

const activeItems = items.filter((item) => item.active === true);

const totalPrice = items.reduce((sum, item) => {
  return sum + Number(item.price ?? 0);
}, 0);

const sortedByPrice = [...items].sort((a, b) => {
  return Number(a.price ?? 0) - Number(b.price ?? 0);
});

return {
  json: {
    ...$json,
    items_count: items.length,
    first_item: items[0] ?? null,
    last_item: items.length ? items[items.length - 1] : null,
    item_names: itemNames,
    active_items: activeItems,
    total_price: Math.round(totalPrice * 100) / 100,
    unique_tags: [...new Set(tags)],
    sorted_by_price: sortedByPrice,
  },
};
```

:::warning
Dans le Code node, toujours vérifier qu’une valeur est bien un tableau avec `Array.isArray()` avant d’utiliser `map`, `filter`, `reduce`, etc.
:::

---

## Notes

### Expressions vs Code node

Utiliser les **expressions** pour :

- compter des éléments ;
- récupérer le premier ou dernier élément ;
- faire un `map` simple ;
- faire un `filter` simple ;
- calculer une somme simple ;
- transformer un tableau court ;
- créer une chaîne avec `join`.

Utiliser le **Code node** pour :

- plusieurs transformations en même temps ;
- logique métier complexe ;
- tableaux imbriqués ;
- regroupement avancé ;
- déduplication complexe ;
- tri multi-critères ;
- gestion d’erreurs détaillée.

---

## Null safety

Recommandé :

```n8n
{{ ($json.items ?? []).length }}
```

À éviter :

```n8n
{{ $json.items.length }}
```

Pourquoi ?

Si `items` est absent ou `null`, l’expression peut échouer.

---

## Type safety

Quand une valeur peut ne pas être un tableau, utiliser une IIFE :

```n8n
{{ (() => {
  const items = Array.isArray($json.items) ? $json.items : [];
  return items.length;
})() }}
```

Ou dans le Code node :

```javascript
const items = Array.isArray($json.items) ? $json.items : [];
```

---

## Mutation warning

Certaines méthodes JavaScript modifient le tableau original :

- `sort()`
- `reverse()`

Pour éviter de modifier le tableau original, créer une copie avec `[...]`.

Recommandé :

```n8n
{{ [...($json.items ?? [])].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```

À éviter si tu veux préserver l’ordre original :

```n8n
{{ ($json.items ?? []).sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}
```

---

## Erreurs fréquentes

| Erreur | Cause probable | Correction |
| --- | --- | --- |
| `Cannot read properties of undefined` | Le champ tableau est absent | Utiliser `($json.items ?? [])` |
| `map is not a function` | La valeur n’est pas un tableau | Vérifier avec `Array.isArray()` |
| `filter is not a function` | La valeur est un objet ou une chaîne | Convertir ou protéger le champ |
| `reduce of empty array with no initial value` | `reduce()` sans valeur initiale | Toujours fournir une valeur initiale |
| Résultat `NaN` | Valeur non numérique dans un calcul | Utiliser `Number(value ?? 0)` |
| Ordre modifié | `sort()` ou `reverse()` modifie l’array | Utiliser `[...array]` avant |
| Résultat vide | Mauvais chemin JSON | Vérifier l’input du node précédent |

---

## Checklist de test

Avant de valider une expression array :

- [ ] Tester avec un tableau rempli.
- [ ] Tester avec un tableau vide.
- [ ] Tester avec un champ absent.
- [ ] Tester avec une valeur `null`.
- [ ] Tester avec un mauvais type, par exemple texte ou objet.
- [ ] Tester avec plusieurs items n8n.
- [ ] Vérifier si la méthode modifie l’ordre original.
- [ ] Vérifier les conversions numériques.
- [ ] Vérifier le résultat dans le preview du champ.
- [ ] Lancer une exécution complète du workflow.

---

## Quick reference

| Besoin | Expression n8n |
| --- | --- |
| Lire un tableau | `{{ $json.items }}` |
| Nombre d’éléments | `{{ ($json.items ?? []).length }}` |
| Premier élément | `{{ ($json.items ?? [])[0] ?? null }}` |
| Dernier élément | `{{ ($json.items ?? []).length ? $json.items[$json.items.length - 1] : null }}` |
| Contient une valeur | `{{ ($json.tags ?? []).includes("vip") }}` |
| Tableau vers texte | `{{ ($json.tags ?? []).join(", ") }}` |
| Map | `{{ ($json.items ?? []).map(item => item.name) }}` |
| Filter | `{{ ($json.items ?? []).filter(item => item.active) }}` |
| Find | `{{ ($json.items ?? []).find(item => item.id === 123) ?? null }}` |
| Some | `{{ ($json.items ?? []).some(item => item.status === "error") }}` |
| Every | `{{ ($json.items ?? []).every(item => item.status === "paid") }}` |
| Reduce somme | `{{ ($json.items ?? []).reduce((sum, item) => sum + Number(item.price ?? 0), 0) }}` |
| Somme n8n | `{{ [1, 2, 3].sum() }}` |
| Moyenne n8n | `{{ [12, 1, 5].average() }}` |
| Ajouter élément | `{{ [...($json.tags ?? []), "new"] }}` |
| Fusionner tableaux | `{{ [...($json.tags ?? []), ...($json.extraTags ?? [])] }}` |
| Supprimer valeurs vides | `{{ ($json.values ?? []).compact() }}` |
| Supprimer doublons | `{{ [...new Set($json.tags ?? [])] }}` |
| Difference | `{{ ($json.tags ?? []).difference($json.excludedTags ?? []) }}` |
| Trier | `{{ [...($json.items ?? [])].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)) }}` |
| Découper | `{{ ($json.items ?? []).slice(0, 5) }}` |
| Chunk | `{{ ($json.items ?? []).chunk(10) }}` |
| JSON stringify | `{{ JSON.stringify($json.items ?? []) }}` |

---

## Références

- n8n Array expression reference: https://docs.n8n.io/data/expression-reference/array/
- n8n Expressions: https://docs.n8n.io/data/expressions/
- n8n Data structure: https://docs.n8n.io/data/data-structure/
- n8n Data mapping: https://docs.n8n.io/data/data-mapping/
- n8n Code node: https://docs.n8n.io/code/code-node/
