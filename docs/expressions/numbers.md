---
id: numbers
title: Math
sidebar_label: Math
---

# Math

Dans n8n, les fonctions mathématiques s’utilisent principalement dans les **expressions**.

Une expression n8n s’écrit avec :

```n8n
{{ ... }}
```

Exemple :

```n8n
{{ 10 + 5 }}
```

Exemple avec une valeur venant d’un item JSON :

```n8n
{{ $json.amount * 1.2 }}
```

Exemple avec une méthode numérique n8n :

```n8n
{{ (-10.89).abs() }}
```

---

## Fonctions disponibles

| Name | Description |
| --- | --- |
| [Abs](#abs)(Decimal) | Retourne la valeur absolue d’un nombre. |
| [Mod](#mod)(Decimal, Decimal) | Retourne le reste d’une division. |
| [Power](#power)(Decimal, Decimal) | Retourne `n` élevé à la puissance `m`. |
| [Round](#round)(Decimal, Integer) | Arrondit un nombre à l’entier le plus proche ou à un nombre de décimales. |
| [Ceil](#ceil)(Decimal) | Arrondit un nombre à l’entier supérieur. |
| [Floor](#floor)(Decimal) | Arrondit un nombre à l’entier inférieur. |
| [Sqrt](#sqrt)(Decimal) | Retourne la racine carrée d’un nombre. |
| [Trunc](#trunc)(Decimal) | Tronque un nombre en supprimant la partie décimale. |
| [Min](#min)(Decimal, Decimal) | Retourne la plus petite valeur. |
| [Max](#max)(Decimal, Decimal) | Retourne la plus grande valeur. |
| [Random](#random)() | Retourne un nombre aléatoire entre `0` et `1`. |
| [IsInteger](#isinteger)(Number) | Retourne `true` si le nombre est entier. |
| [IsEven](#iseven)(Number) | Retourne `true` si le nombre est pair. |
| [IsOdd](#isodd)(Number) | Retourne `true` si le nombre est impair. |
| [ToNumber](#tonumber)(Text) | Convertit une valeur en nombre. |
| [ToBoolean](#toboolean)(Number) | Convertit un nombre en booléen. |
| [Format](#format)(Number) | Formate un nombre selon une locale ou une devise. |

---

## Abs

Retourne la valeur absolue d’un nombre.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- HTTP Request node fields: Yes
- Code node: Yes, en JavaScript

### Syntax

Méthode n8n :

```n8n
{{ number.abs() }}
```

Alternative JavaScript :

```n8n
{{ Math.abs(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre dont on veut obtenir la valeur absolue.

### Output

Type: Number

### Examples

```n8n
{{ (-10.89).abs() }}
```

Output:

```text
10.89
```

Avec un champ JSON :

```n8n
{{ ($json.amount ?? 0).abs() }}
```

Alternative :

```n8n
{{ Math.abs($json.amount ?? 0) }}
```

---

## Mod

Retourne le reste d’une division.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- Code node: Yes, en JavaScript

### Syntax

```n8n
{{ n % m }}
```

### Parameters

n
: Type: Decimal. Mandatory.  
Dividende.

m
: Type: Decimal. Mandatory.  
Diviseur.

### Output

Type: Number

### Examples

```n8n
{{ 10 % 3 }}
```

Output:

```text
1
```

```n8n
{{ 4 % 3.5 }}
```

Output:

```text
0.5
```

Avec un champ JSON :

```n8n
{{ ($json.quantity ?? 0) % 2 }}
```

---

## Power

Retourne `n` élevé à la puissance `m`.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- Code node: Yes, en JavaScript

### Syntax

```n8n
{{ Math.pow(n, m) }}
```

ou :

```n8n
{{ n ** m }}
```

### Parameters

n
: Type: Decimal. Mandatory.  
Base.

m
: Type: Decimal. Mandatory.  
Exposant.

### Output

Type: Number

### Examples

```n8n
{{ Math.pow(100, 2) }}
```

Output:

```text
10000
```

```n8n
{{ 100 ** 2 }}
```

Output:

```text
10000
```

Avec un champ JSON :

```n8n
{{ Math.pow($json.base ?? 0, $json.exponent ?? 1) }}
```

:::warning
En JavaScript, une puissance fractionnaire appliquée à un nombre négatif peut retourner `NaN`.

Exemple :

```n8n
{{ Math.pow(-10.89, 2.3) }}
```

peut retourner :

```text
NaN
```
:::

---

## Round

Arrondit un nombre à l’entier le plus proche ou à un nombre de décimales.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- HTTP Request node fields: Yes
- Code node: Yes, en JavaScript

### Syntax

Méthode n8n :

```n8n
{{ number.round(decimalPlaces) }}
```

Alternative JavaScript entière :

```n8n
{{ Math.round(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre à arrondir.

decimalPlaces
: Type: Integer. Optional.  
Nombre de décimales à conserver.

### Output

Type: Number

### Examples

```n8n
{{ (9.3).round() }}
```

Output:

```text
9
```

```n8n
{{ (9.123456789).round(5) }}
```

Output:

```text
9.12346
```

```n8n
{{ (1.256).round(2) }}
```

Output:

```text
1.26
```

Avec un champ JSON :

```n8n
{{ ($json.price ?? 0).round(2) }}
```

:::warning
La méthode d’arrondi JavaScript/n8n peut différer de certaines règles métier ou bases de données.

Pour des calculs financiers critiques, valider la règle d’arrondi attendue avant usage.
:::

---

## Ceil

Arrondit un nombre à l’entier supérieur.

### Syntax

Méthode n8n :

```n8n
{{ number.ceil() }}
```

Alternative JavaScript :

```n8n
{{ Math.ceil(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre à arrondir.

### Output

Type: Number

### Examples

```n8n
{{ (1.234).ceil() }}
```

Output:

```text
2
```

```n8n
{{ Math.ceil(1.234) }}
```

Output:

```text
2
```

---

## Floor

Arrondit un nombre à l’entier inférieur.

### Syntax

Méthode n8n :

```n8n
{{ number.floor() }}
```

Alternative JavaScript :

```n8n
{{ Math.floor(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre à arrondir.

### Output

Type: Number

### Examples

```n8n
{{ (1.234).floor() }}
```

Output:

```text
1
```

```n8n
{{ Math.floor(1.234) }}
```

Output:

```text
1
```

---

## Sqrt

Retourne la racine carrée d’un nombre.

### Syntax

```n8n
{{ Math.sqrt(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre dont on veut calculer la racine carrée.

### Output

Type: Number

### Examples

```n8n
{{ Math.sqrt(2.3) }}
```

Output:

```text
1.51657508881031
```

Avec un champ JSON :

```n8n
{{ Math.sqrt($json.value ?? 0) }}
```

:::warning
La racine carrée d’un nombre négatif retourne `NaN`.

Exemple :

```n8n
{{ Math.sqrt(-1) }}
```
:::

---

## Trunc

Tronque un nombre en supprimant sa partie décimale.

### Syntax

```n8n
{{ Math.trunc(number) }}
```

### Parameters

number
: Type: Decimal. Mandatory.  
Nombre à tronquer.

### Output

Type: Number

### Examples

```n8n
{{ Math.trunc(-10.89) }}
```

Output:

```text
-10
```

```n8n
{{ Math.trunc(7.51) }}
```

Output:

```text
7
```

---

## Min

Retourne la plus petite valeur.

### Syntax

```n8n
{{ Math.min(n1, n2) }}
```

### Parameters

n1
: Type: Decimal. Mandatory.  
Première valeur.

n2
: Type: Decimal. Mandatory.  
Deuxième valeur.

### Output

Type: Number

### Examples

```n8n
{{ Math.min(10, 3) }}
```

Output:

```text
3
```

Avec plusieurs valeurs :

```n8n
{{ Math.min(10, 3, 25, -2) }}
```

Output:

```text
-2
```

Avec un tableau :

```n8n
{{ Math.min(...$json.values) }}
```

Input:

```json
{
  "values": [10, 3, 25, -2]
}
```

Output:

```text
-2
```

---

## Max

Retourne la plus grande valeur.

### Syntax

```n8n
{{ Math.max(n1, n2) }}
```

### Parameters

n1
: Type: Decimal. Mandatory.  
Première valeur.

n2
: Type: Decimal. Mandatory.  
Deuxième valeur.

### Output

Type: Number

### Examples

```n8n
{{ Math.max(10, 3) }}
```

Output:

```text
10
```

Avec plusieurs valeurs :

```n8n
{{ Math.max(10, 3, 25, -2) }}
```

Output:

```text
25
```

Avec un tableau :

```n8n
{{ Math.max(...$json.values) }}
```

Input:

```json
{
  "values": [10, 3, 25, -2]
}
```

Output:

```text
25
```

---

## Random

Retourne un nombre aléatoire entre `0` et `1`.

### Syntax

```n8n
{{ Math.random() }}
```

### Output

Type: Number

### Examples

```n8n
{{ Math.random() }}
```

Output possible:

```text
0.742391
```

Nombre entier entre 1 et 10 :

```n8n
{{ Math.floor(Math.random() * 10) + 1 }}
```

---

## IsInteger

Retourne `true` si le nombre est entier.

### Syntax

Méthode n8n :

```n8n
{{ number.isInteger() }}
```

Alternative JavaScript :

```n8n
{{ Number.isInteger(number) }}
```

### Parameters

number
: Type: Number. Mandatory.  
Nombre à tester.

### Output

Type: Boolean

### Examples

```n8n
{{ (4).isInteger() }}
```

Output:

```json
true
```

```n8n
{{ (4.12).isInteger() }}
```

Output:

```json
false
```

Avec un champ JSON :

```n8n
{{ Number.isInteger($json.quantity) }}
```

---

## IsEven

Retourne `true` si le nombre est pair.

### Syntax

Méthode n8n :

```n8n
{{ number.isEven() }}
```

Alternative JavaScript :

```n8n
{{ number % 2 === 0 }}
```

### Parameters

number
: Type: Number. Mandatory.  
Nombre entier à tester.

### Output

Type: Boolean

### Examples

```n8n
{{ (34).isEven() }}
```

Output:

```json
true
```

```n8n
{{ (33).isEven() }}
```

Output:

```json
false
```

Avec un champ JSON :

```n8n
{{ ($json.quantity ?? 0) % 2 === 0 }}
```

:::warning
`isEven()` attend un nombre entier.  
Si le nombre n’est pas entier, la méthode peut générer une erreur.
:::

---

## IsOdd

Retourne `true` si le nombre est impair.

### Syntax

Méthode n8n :

```n8n
{{ number.isOdd() }}
```

Alternative JavaScript :

```n8n
{{ Math.abs(number % 2) === 1 }}
```

### Parameters

number
: Type: Number. Mandatory.  
Nombre entier à tester.

### Output

Type: Boolean

### Examples

```n8n
{{ (33).isOdd() }}
```

Output:

```json
true
```

```n8n
{{ (34).isOdd() }}
```

Output:

```json
false
```

Avec un champ JSON :

```n8n
{{ Math.abs(($json.quantity ?? 0) % 2) === 1 }}
```

:::warning
`isOdd()` attend un nombre entier.  
Si le nombre n’est pas entier, la méthode peut générer une erreur.
:::

---

## ToNumber

Convertit une valeur en nombre.

### Syntax

```n8n
{{ Number(value) }}
```

ou :

```n8n
{{ parseFloat(value) }}
```

### Parameters

value
: Type: Any. Mandatory.  
Valeur à convertir.

### Output

Type: Number

### Examples

```n8n
{{ Number("10.89") }}
```

Output:

```text
10.89
```

```n8n
{{ parseFloat("10.89 EUR") }}
```

Output:

```text
10.89
```

Avec un champ JSON :

```n8n
{{ Number($json.amount ?? 0) }}
```

:::warning
Si la valeur ne peut pas être convertie en nombre, JavaScript retourne `NaN`.

Exemple :

```n8n
{{ Number("abc") }}
```
:::

---

## ToBoolean

Convertit un nombre en booléen.

### Syntax

Méthode n8n :

```n8n
{{ number.toBoolean() }}
```

Alternative JavaScript :

```n8n
{{ Boolean(number) }}
```

### Parameters

number
: Type: Number. Mandatory.  
Nombre à convertir.

### Output

Type: Boolean

### Examples

```n8n
{{ (12).toBoolean() }}
```

Output:

```json
true
```

```n8n
{{ (0).toBoolean() }}
```

Output:

```json
false
```

---

## Format

Formate un nombre selon une locale ou une devise.

### Syntax

Méthode n8n :

```n8n
{{ number.format(locale, options) }}
```

Alternative JavaScript :

```n8n
{{ number.toLocaleString(locale, options) }}
```

### Parameters

number
: Type: Number. Mandatory.  
Nombre à formater.

locale
: Type: Text. Optional.  
Locale, par exemple `fr-FR`, `en-US`, `de-DE`.

options
: Type: Object. Optional.  
Options de formatage.

### Output

Type: Text

### Examples

```n8n
{{ (123456.789).format('de-DE') }}
```

Output:

```text
123.456,789
```

Format devise :

```n8n
{{ (123456.789).format('fr-FR', { style: 'currency', currency: 'EUR' }) }}
```

Output:

```text
123 456,79 €
```

Avec un champ JSON :

```n8n
{{ ($json.amount ?? 0).format('fr-FR', { style: 'currency', currency: 'EUR' }) }}
```

---

## Common patterns

### Calculer une TVA de 20 %

```n8n
{{ (($json.amount ?? 0) * 1.2).round(2) }}
```

### Calculer uniquement le montant TVA

```n8n
{{ (($json.amount ?? 0) * 0.2).round(2) }}
```

### Calculer un pourcentage

```n8n
{{ (($json.part ?? 0) / ($json.total ?? 1) * 100).round(2) }}
```

### Éviter une division par zéro

```n8n
{{ ($json.total ?? 0) === 0 ? 0 : (($json.part ?? 0) / $json.total).round(2) }}
```

### Arrondir un prix à deux décimales

```n8n
{{ ($json.price ?? 0).round(2) }}
```

### Convertir un texte en nombre puis calculer

```n8n
{{ (Number($json.amount ?? 0) * 1.2).round(2) }}
```

### Vérifier si un nombre est pair

```n8n
{{ Number.isInteger($json.quantity) && $json.quantity % 2 === 0 }}
```

### Vérifier si un nombre est impair

```n8n
{{ Number.isInteger($json.quantity) && Math.abs($json.quantity % 2) === 1 }}
```

### Générer un entier aléatoire entre 1000 et 9999

```n8n
{{ Math.floor(Math.random() * 9000) + 1000 }}
```

### Formater un montant en euros

```n8n
{{ ($json.amount ?? 0).format('fr-FR', { style: 'currency', currency: 'EUR' }) }}
```

---

## Usage in Edit Fields / Set node

Exemple de configuration dans un node **Edit Fields** ou **Set** :

```json
{
  "amount_number": "{{ Number($json.amount ?? 0) }}",
  "amount_tax_included": "{{ (Number($json.amount ?? 0) * 1.2).round(2) }}",
  "tax_amount": "{{ (Number($json.amount ?? 0) * 0.2).round(2) }}",
  "discounted_amount": "{{ (Number($json.amount ?? 0) * 0.9).round(2) }}",
  "amount_formatted": "{{ (Number($json.amount ?? 0)).format('fr-FR', { \"style\": \"currency\", \"currency\": \"EUR\" }) }}"
}
```

---

## Usage in Code node

Pour des transformations plus longues, utiliser le **Code node**.

Mode recommandé pour cet exemple : **Run Once for Each Item**.

```javascript
const rawAmount = $json.amount ?? 0;
const amount = Number(rawAmount);

const safeAmount = Number.isFinite(amount) ? amount : 0;
const taxRate = 0.2;

return {
  json: {
    ...$json,
    amount_number: safeAmount,
    tax_amount: Math.round(safeAmount * taxRate * 100) / 100,
    amount_tax_included: Math.round(safeAmount * (1 + taxRate) * 100) / 100,
    amount_absolute: Math.abs(safeAmount),
    amount_truncated: Math.trunc(safeAmount),
    amount_formatted: new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(safeAmount),
  },
};
```

:::warning
Dans le Code node, toujours vérifier que la conversion numérique est valide avec `Number.isFinite()` si la valeur vient d’une source externe.
:::

---

## Notes

### Expressions vs Code node

Utiliser les **expressions** pour :

- faire une addition simple ;
- calculer une TVA ;
- arrondir un montant ;
- vérifier pair/impair ;
- formater un montant ;
- convertir une chaîne numérique.

Utiliser le **Code node** pour :

- appliquer plusieurs règles métier ;
- gérer plusieurs champs numériques ;
- traiter des tableaux ;
- éviter les erreurs de conversion ;
- centraliser des règles d’arrondi complexes.

### Null safety

Recommandé :

```n8n
{{ Number($json.amount ?? 0) }}
```

Avec calcul :

```n8n
{{ (Number($json.amount ?? 0) * 1.2).round(2) }}
```

À éviter si le champ peut être absent :

```n8n
{{ $json.amount.round(2) }}
```

### NaN safety

Recommandé :

```n8n
{{ Number.isFinite(Number($json.amount)) ? Number($json.amount) : 0 }}
```

Avec calcul :

```n8n
{{ (Number.isFinite(Number($json.amount)) ? Number($json.amount) : 0) * 1.2 }}
```

---

## Quick reference

| Besoin | Expression n8n |
| --- | --- |
| Valeur absolue | `{{ (-10.89).abs() }}` |
| Valeur absolue JS | `{{ Math.abs(-10.89) }}` |
| Modulo | `{{ 10 % 3 }}` |
| Puissance | `{{ Math.pow(100, 2) }}` |
| Puissance alternative | `{{ 100 ** 2 }}` |
| Arrondir | `{{ (9.123).round(2) }}` |
| Arrondir entier JS | `{{ Math.round(9.3) }}` |
| Entier supérieur | `{{ (1.234).ceil() }}` |
| Entier inférieur | `{{ (1.234).floor() }}` |
| Racine carrée | `{{ Math.sqrt(2.3) }}` |
| Tronquer | `{{ Math.trunc(7.51) }}` |
| Minimum | `{{ Math.min(10, 3) }}` |
| Maximum | `{{ Math.max(10, 3) }}` |
| Aléatoire 0-1 | `{{ Math.random() }}` |
| Entier aléatoire 1-10 | `{{ Math.floor(Math.random() * 10) + 1 }}` |
| Est entier | `{{ (4).isInteger() }}` |
| Est pair | `{{ (34).isEven() }}` |
| Est impair | `{{ (33).isOdd() }}` |
| Convertir en nombre | `{{ Number($json.amount ?? 0) }}` |
| Nombre vers booléen | `{{ (0).toBoolean() }}` |
| Format français | `{{ (123456.789).format('fr-FR') }}` |
| Format devise EUR | `{{ (123456.789).format('fr-FR', { style: 'currency', currency: 'EUR' }) }}` |

---

## Références

- n8n Number expression reference: https://docs.n8n.io/data/expression-reference/number/
- n8n Expressions: https://docs.n8n.io/data/expressions/
- n8n Expressions for data transformation: https://docs.n8n.io/data/expressions-for-transformation/
