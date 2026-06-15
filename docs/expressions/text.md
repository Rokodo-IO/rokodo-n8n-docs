---
id: text
title: Text
sidebar_label: Text
---

# Text

Les fonctions texte dans n8n s’utilisent principalement dans les **expressions**.

Une expression n8n s’écrit avec :

```n8n
{{ ... }}
```

Exemple :

```n8n
{{ $json.country }}
```

Exemple avec transformation :

```n8n
{{ ($json.country ?? "").trim().toUpperCase() }}
```

`$json` représente les données JSON de l’item courant.

---

## Fonctions disponibles

| Name | Description |
| --- | --- |
| [Concat](#concat) | Concatène plusieurs textes. |
| [Length](#length) | Retourne le nombre de caractères. |
| [ToLower](#tolower) | Convertit un texte en minuscules. |
| [ToUpper](#toupper) | Convertit un texte en majuscules. |
| [Trim](#trim) | Supprime les espaces au début et à la fin. |
| [TrimStart](#trimstart) | Supprime les espaces au début. |
| [TrimEnd](#trimend) | Supprime les espaces à la fin. |
| [Replace](#replace) | Remplace la première occurrence trouvée. |
| [ReplaceAll](#replaceall) | Remplace toutes les occurrences trouvées. |
| [Index](#index) | Retourne la position d’un texte recherché. |
| [Includes](#includes) | Vérifie si un texte contient une valeur. |
| [Substr](#substr) | Extrait une partie d’un texte. |
| [EncodeUrl](#encodeurl) | Encode une valeur pour une URL. |
| [NewLine](#newline) | Ajoute un retour à la ligne. |
| [Chr](#chr) | Retourne un caractère depuis un code Unicode/ASCII. |
| [DefaultValue](#defaultvalue) | Retourne une valeur par défaut si `null` ou `undefined`. |

---

## Concat

Concatène plusieurs textes.

### Syntax

```n8n
{{ text1 + text2 }}
```

ou :

```n8n
{{ `${text1}${text2}` }}
```

### Parameters

text1
: Type: Text. Mandatory.  
Premier texte.

text2
: Type: Text. Mandatory.  
Texte à ajouter.

### Output

Type: Text

### Examples

```n8n
{{ "First string" + "last string" }}
```

Output:

```text
First stringlast string
```

Avec des champs JSON :

```n8n
{{ ($json.firstName ?? "") + " " + ($json.lastName ?? "") }}
```

Input:

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

Output:

```text
John Doe
```

---

## Length

Retourne le nombre de caractères dans un texte.

### Syntax

```n8n
{{ text.length }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à mesurer.

### Output

Type: Integer

### Examples

```n8n
{{ "First string".length }}
```

Output:

```text
12
```

Avec protection contre `null` ou `undefined` :

```n8n
{{ ($json.name ?? "").length }}
```

---

## ToLower

Convertit un texte en minuscules.

### Syntax

```n8n
{{ text.toLowerCase() }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à convertir.

### Output

Type: Text

### Examples

```n8n
{{ "First string".toLowerCase() }}
```

Output:

```text
first string
```

Avec un champ JSON :

```n8n
{{ ($json.email ?? "").toLowerCase() }}
```

---

## ToUpper

Convertit un texte en majuscules.

### Syntax

```n8n
{{ text.toUpperCase() }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à convertir.

### Output

Type: Text

### Examples

```n8n
{{ "First string".toUpperCase() }}
```

Output:

```text
FIRST STRING
```

Avec un champ JSON :

```n8n
{{ ($json.country ?? "").toUpperCase() }}
```

---

## Trim

Supprime les espaces au début et à la fin d’un texte.

### Syntax

```n8n
{{ text.trim() }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à nettoyer.

### Output

Type: Text

### Examples

```n8n
{{ " First string ".trim() }}
```

Output:

```text
First string
```

Avec un champ JSON :

```n8n
{{ ($json.country ?? "").trim() }}
```

Input:

```json
{
  "country": "  France  "
}
```

Output:

```text
France
```

---

## TrimStart

Supprime les espaces au début d’un texte.

### Syntax

```n8n
{{ text.trimStart() }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à nettoyer.

### Output

Type: Text

### Examples

```n8n
{{ " First string ".trimStart() }}
```

Output:

```text
First string 
```

Avec un champ JSON :

```n8n
{{ ($json.country ?? "").trimStart() }}
```

---

## TrimEnd

Supprime les espaces à la fin d’un texte.

### Syntax

```n8n
{{ text.trimEnd() }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte à nettoyer.

### Output

Type: Text

### Examples

```n8n
{{ " First string ".trimEnd() }}
```

Output:

```text
 First string
```

Avec un champ JSON :

```n8n
{{ ($json.country ?? "").trimEnd() }}
```

---

## Replace

Remplace la première occurrence trouvée dans un texte.

### Syntax

```n8n
{{ text.replace(search, replacement) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte source.

search
: Type: Text or RegExp. Mandatory.  
Valeur à rechercher.

replacement
: Type: Text. Mandatory.  
Valeur de remplacement.

### Output

Type: Text

### Examples

```n8n
{{ "First string".replace("First", "Second") }}
```

Output:

```text
Second string
```

```n8n
{{ "First string".replace("xx", "") }}
```

Output:

```text
First string
```

Avec un champ JSON :

```n8n
{{ ($json.title ?? "").replace(" ", "-") }}
```

:::warning
`replace()` remplace uniquement la première occurrence.  
Pour remplacer toutes les occurrences, utiliser `replaceAll()`.
:::

---

## ReplaceAll

Remplace toutes les occurrences trouvées dans un texte.

### Syntax

```n8n
{{ text.replaceAll(search, replacement) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte source.

search
: Type: Text or RegExp. Mandatory.  
Valeur à rechercher.

replacement
: Type: Text. Mandatory.  
Valeur de remplacement.

### Output

Type: Text

### Examples

```n8n
{{ "First string test".replaceAll(" ", "_") }}
```

Output:

```text
First_string_test
```

Créer un slug simple :

```n8n
{{ ($json.title ?? "").trim().toLowerCase().replaceAll(" ", "-") }}
```

Input:

```json
{
  "title": " My New Article "
}
```

Output:

```text
my-new-article
```

---

## Index

Retourne la position zéro-based d’un texte recherché.

Retourne `-1` si le texte recherché n’est pas trouvé.

### Syntax

```n8n
{{ text.indexOf(search) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte dans lequel chercher.

search
: Type: Text. Mandatory.  
Texte à rechercher.

### Output

Type: Integer

### Examples

```n8n
{{ "First string".indexOf("F") }}
```

Output:

```text
0
```

```n8n
{{ "First string".indexOf("st") }}
```

Output:

```text
3
```

```n8n
{{ "First string".indexOf("xx") }}
```

Output:

```text
-1
```

Avec un champ JSON :

```n8n
{{ ($json.description ?? "").indexOf("urgent") }}
```

---

## Includes

Retourne `true` si le texte contient la valeur recherchée.

### Syntax

```n8n
{{ text.includes(search) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte dans lequel chercher.

search
: Type: Text. Mandatory.  
Texte à rechercher.

### Output

Type: Boolean

### Examples

```n8n
{{ "john@example.com".includes("@") }}
```

Output:

```json
true
```

```n8n
{{ "First string".includes("xx") }}
```

Output:

```json
false
```

Recherche non sensible à la casse :

```n8n
{{ ($json.description ?? "").toLowerCase().includes("urgent") }}
```

---

## Substr

Retourne une sous-chaîne à partir d’une position et d’une longueur.

En JavaScript, `substring(start, end)` utilise un index de début et un index de fin.  
Pour reproduire une fonction de type `Substr(text, start, length)`, il faut calculer `start + length`.

### Syntax

```n8n
{{ text.substring(start, start + length) }}
```

ou :

```n8n
{{ text.slice(start, start + length) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Texte source.

start
: Type: Integer. Mandatory.  
Position zéro-based de départ.

length
: Type: Integer. Mandatory.  
Nombre de caractères à extraire.

### Output

Type: Text

### Examples

```n8n
{{ "First string".substring(2, 2 + 4) }}
```

Output:

```text
rst 
```

```n8n
{{ "First string".substring(0, 5) }}
```

Output:

```text
First
```

Avec un champ JSON :

```n8n
{{ ($json.reference ?? "").substring(0, 8) }}
```

---

## EncodeUrl

Encode un texte pour l’utiliser dans une URL.

Utiliser cette fonction lorsqu’une valeur dynamique doit être placée dans un paramètre d’URL.

### Syntax

```n8n
{{ encodeURIComponent(text) }}
```

### Parameters

text
: Type: Text. Mandatory.  
Le texte à encoder.

### Output

Type: Text

### Examples

```n8n
{{ encodeURIComponent("Company A&A") }}
```

Output:

```text
Company%20A%26A
```

Usage dans une URL :

```n8n
{{ "https://example.com?company=" + encodeURIComponent($json.companyName ?? "") }}
```

---

## NewLine

Retourne un retour à la ligne.

### Syntax

```n8n
{{ "\n" }}
```

### Output

Type: Text

### Examples

```n8n
{{ "Hello" + "\n" + "World" }}
```

Output:

```text
Hello
World
```

---

## Chr

Retourne un caractère correspondant à un code Unicode/ASCII.

### Syntax

```n8n
{{ String.fromCharCode(code) }}
```

### Parameters

code
: Type: Integer. Mandatory.  
Code caractère à convertir.

### Output

Type: Text

### Examples

```n8n
{{ String.fromCharCode(88) }}
```

Output:

```text
X
```

---

## DefaultValue

Retourne une valeur par défaut si une valeur est `null` ou `undefined`.

Cette logique est très utile dans n8n pour éviter les erreurs lorsque des champs sont absents dans certains items.

### Syntax

```n8n
{{ value ?? defaultValue }}
```

### Parameters

value
: Type: Any. Mandatory.  
Valeur à tester.

defaultValue
: Type: Any. Mandatory.  
Valeur retournée si `value` est `null` ou `undefined`.

### Output

Type: Any

### Examples

```n8n
{{ $json.country ?? "Empty" }}
```

Input:

```json
{
  "country": null
}
```

Output:

```text
Empty
```

Input:

```json
{
  "country": "France"
}
```

Output:

```text
France
```

Avec transformation :

```n8n
{{ ($json.country ?? "Empty").trim().toUpperCase() }}
```

---

## Common patterns

### Nettoyer un pays

```n8n
{{ ($json.country ?? "Empty").trim().toUpperCase() }}
```

Input:

```json
{
  "country": "  france "
}
```

Output:

```text
FRANCE
```

---

### Nettoyer un email

```n8n
{{ ($json.email ?? "").trim().toLowerCase() }}
```

Input:

```json
{
  "email": " JOHN@EXAMPLE.COM "
}
```

Output:

```text
john@example.com
```

---

### Vérifier si un texte est vide

```n8n
{{ ($json.value ?? "").trim() === "" }}
```

Output:

```json
true
```

---

### Afficher "Empty" si une valeur est vide

```n8n
{{ (($json.country ?? "").trim() === "") ? "Empty" : $json.country.trim() }}
```

---

### Extraire le domaine d’un email

```n8n
{{ ($json.email ?? "").split("@")[1] ?? "Empty" }}
```

Input:

```json
{
  "email": "john@example.com"
}
```

Output:

```text
example.com
```

---

### Créer un slug simple

```n8n
{{ ($json.title ?? "").trim().toLowerCase().replaceAll(" ", "-") }}
```

Input:

```json
{
  "title": " My New Article "
}
```

Output:

```text
my-new-article
```

---

## Usage in Edit Fields / Set node

Exemple de configuration dans un node **Edit Fields** ou **Set** :

```json
{
  "country_clean": "{{ ($json.country ?? \"Empty\").trim().toUpperCase() }}",
  "email_clean": "{{ ($json.email ?? \"\").trim().toLowerCase() }}",
  "title_slug": "{{ ($json.title ?? \"\").trim().toLowerCase().replaceAll(\" \", \"-\") }}"
}
```

---

## Usage in Code node

Pour des transformations plus longues, utiliser le **Code node**.

Mode recommandé pour cet exemple : **Run Once for Each Item**.

```javascript
const country = $json.country ?? "Empty";
const email = $json.email ?? "";
const title = $json.title ?? "";

return {
  json: {
    ...$json,
    country_clean: country.trim().toUpperCase(),
    email_clean: email.trim().toLowerCase(),
    title_slug: title.trim().toLowerCase().replaceAll(" ", "-"),
  },
};
```

---

## Notes

### Expressions vs Code node

Utiliser les **expressions** pour :

- lire une valeur d’un node précédent ;
- transformer légèrement une valeur ;
- construire une URL ;
- nettoyer un champ simple ;
- faire une condition courte.

Utiliser le **Code node** pour :

- des transformations longues ;
- plusieurs conditions ;
- des boucles ;
- des validations complexes ;
- restructurer plusieurs items ;
- manipuler des tableaux ou objets complexes.

### Null safety

Dans n8n, certains items peuvent ne pas contenir tous les champs.  
Il est recommandé d’utiliser `??` pour éviter les erreurs sur les champs absents.

Recommandé :

```n8n
{{ ($json.country ?? "").trim() }}
```

Risque d’erreur si `country` est `null` ou absent :

```n8n
{{ $json.country.trim() }}
```

---

## Quick reference

| Besoin | Expression n8n |
| --- | --- |
| Lire un champ | `{{ $json.country }}` |
| Valeur par défaut | `{{ $json.country ?? "Empty" }}` |
| Trim | `{{ ($json.country ?? "").trim() }}` |
| Trim début | `{{ ($json.country ?? "").trimStart() }}` |
| Trim fin | `{{ ($json.country ?? "").trimEnd() }}` |
| Majuscules | `{{ ($json.country ?? "").toUpperCase() }}` |
| Minuscules | `{{ ($json.country ?? "").toLowerCase() }}` |
| Longueur | `{{ ($json.country ?? "").length }}` |
| Contient | `{{ ($json.country ?? "").includes("FR") }}` |
| Index | `{{ ($json.country ?? "").indexOf("FR") }}` |
| Remplacer première occurrence | `{{ ($json.text ?? "").replace("a", "b") }}` |
| Remplacer toutes les occurrences | `{{ ($json.text ?? "").replaceAll("a", "b") }}` |
| Extraire une partie | `{{ ($json.text ?? "").substring(0, 5) }}` |
| Encoder URL | `{{ encodeURIComponent($json.value ?? "") }}` |
| Retour ligne | `{{ "Hello\nWorld" }}` |
| Caractère par code | `{{ String.fromCharCode(88) }}` |

---

## Références

- n8n Expressions: https://docs.n8n.io/data/expressions/
- n8n String methods: https://docs.n8n.io/data/expression-reference/string/
- n8n Code node: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/   