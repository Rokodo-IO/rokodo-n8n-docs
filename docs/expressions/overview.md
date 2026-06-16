---
id: overview
title: Overview
sidebar_label: Overview
---

# Expressions n8n

Les **expressions n8n** permettent d’utiliser des données dynamiques dans les paramètres des nodes.

Elles servent à :

- lire une valeur venant d’un node précédent ;
- transformer légèrement une donnée ;
- construire une URL ;
- créer un body JSON dynamique ;
- appliquer une condition simple ;
- formater du texte, des nombres ou des dates ;
- utiliser des variables n8n comme `$json`, `$now`, `$today`, `$node`, `$workflow` ou `$execution`.

Une expression n8n s’écrit avec la syntaxe :

```n8n
{{ ... }}
```

Exemple simple :

```n8n
{{ $json.email }}
```

Exemple avec transformation :

```n8n
{{ ($json.email ?? "").trim().toLowerCase() }}
```

---

## Quand utiliser une expression ?

Utiliser une expression lorsque la transformation est courte et lisible.

### Cas recommandés

| Besoin | Exemple |
| --- | --- |
| Lire un champ JSON | `{{ $json.email }}` |
| Mettre une valeur par défaut | `{{ $json.country ?? "Empty" }}` |
| Nettoyer un texte | `{{ ($json.name ?? "").trim() }}` |
| Mettre en majuscules | `{{ ($json.country ?? "").toUpperCase() }}` |
| Calculer un montant | `{{ (($json.amount ?? 0) * 1.2).round(2) }}` |
| Formater une date | `{{ $now.toFormat('yyyy-MM-dd') }}` |
| Construire une URL | `{{ "https://api.example.com/users/" + $json.id }}` |
| Encoder un paramètre URL | `{{ encodeURIComponent($json.search ?? "") }}` |
| Vérifier une condition | `{{ ($json.status ?? "") === "active" }}` |

---

## Quand utiliser le Code node ?

Utiliser le **Code node** lorsque la logique devient trop longue pour tenir proprement dans une expression.

### Cas recommandés pour le Code node

- plusieurs conditions imbriquées ;
- plusieurs champs à transformer en même temps ;
- boucles ;
- traitement de tableaux ;
- restructuration d’objets JSON ;
- validations complexes ;
- logique métier réutilisable ;
- gestion d’erreurs avancée.

Exemple à éviter dans une expression :

```n8n
{{ $json.amount > 1000 && $json.country === "FR" && $json.status === "active" ? (($json.amount * 1.2).round(2)) : 0 }}
```

Version plus lisible dans un **Code node** :

```javascript
const amount = Number($json.amount ?? 0);
const country = $json.country ?? "";
const status = $json.status ?? "";

const shouldApplyTax = amount > 1000 && country === "FR" && status === "active";

return {
  json: {
    ...$json,
    amount_tax_included: shouldApplyTax ? Math.round(amount * 1.2 * 100) / 100 : 0,
  },
};
```

---

## Où utiliser les expressions ?

Les expressions peuvent être utilisées dans la plupart des paramètres des nodes n8n.

### Exemples de nodes fréquents

| Node | Usage courant |
| --- | --- |
| Edit Fields / Set | Créer ou transformer des champs |
| IF | Comparer des valeurs |
| Switch | Router selon une valeur |
| HTTP Request | Construire URL, headers, query params, body |
| Webhook Response | Retourner une réponse dynamique |
| Code | Lire les données d’entrée, mais le code n’utilise pas `{{ ... }}` |
| Date & Time | Convertir ou formater des dates |
| Merge | Combiner des jeux de données |
| Filter | Garder certains items |

:::warning
Dans un **champ d’expression**, on utilise `{{ ... }}`.

Dans le **Code node**, on écrit du JavaScript directement, sans `{{ ... }}`.
:::

---

## Variables n8n courantes

| Variable | Description | Exemple |
| --- | --- | --- |
| `$json` | Données JSON de l’item courant | `{{ $json.email }}` |
| `$binary` | Données binaires de l’item courant | `{{ $binary.data.fileName }}` |
| `$now` | Date et heure courantes | `{{ $now.toISO() }}` |
| `$today` | Date courante au début de la journée | `{{ $today.toFormat('yyyy-MM-dd') }}` |
| `$node` | Accès aux données d’un node spécifique | `{{ $node["HTTP Request"].json.id }}` |
| `$workflow` | Informations sur le workflow | `{{ $workflow.name }}` |
| `$execution` | Informations sur l’exécution | `{{ $execution.id }}` |
| `$env` | Variables d’environnement disponibles | `{{ $env.MY_VARIABLE }}` |

---

## Lire les données de l’item courant

### Champ simple

```n8n
{{ $json.email }}
```

Input :

```json
{
  "email": "john@example.com"
}
```

Output :

```text
john@example.com
```

---

### Champ imbriqué

```n8n
{{ $json.user.email }}
```

Input :

```json
{
  "user": {
    "email": "john@example.com"
  }
}
```

Output :

```text
john@example.com
```

---

### Champ avec nom contenant des espaces

```n8n
{{ $json["first name"] }}
```

Input :

```json
{
  "first name": "John"
}
```

Output :

```text
John
```

---

## Lire les données d’un autre node

Pour référencer un node spécifique :

```n8n
{{ $node["Node Name"].json.field }}
```

Exemple :

```n8n
{{ $node["Webhook"].json.body.email }}
```

:::tip
Quand c’est possible, préférer `$json` pour lire les données de l’item courant.  
Utiliser `$node["Node Name"]` lorsque la donnée doit venir explicitement d’un node précis.
:::

---

## Valeurs par défaut

Utiliser l’opérateur `??` pour fournir une valeur si le champ est `null` ou `undefined`.

```n8n
{{ $json.country ?? "Empty" }}
```

Input :

```json
{
  "country": null
}
```

Output :

```text
Empty
```

Avec transformation :

```n8n
{{ ($json.country ?? "Empty").trim().toUpperCase() }}
```

---

## Conditions dans une expression

### If simple

```n8n
{{ $json.country === null ? "Empty" : $json.country }}
```

### If avec valeur absente ou null

```n8n
{{ $json.country ?? "Empty" }}
```

### If avec chaîne vide

```n8n
{{ (($json.country ?? "").trim() === "") ? "Empty" : $json.country.trim() }}
```

### Condition booléenne

```n8n
{{ ($json.status ?? "") === "active" }}
```

---

## Texte

Exemples courants :

```n8n
{{ ($json.name ?? "").trim() }}
```

```n8n
{{ ($json.country ?? "").toUpperCase() }}
```

```n8n
{{ ($json.email ?? "").toLowerCase() }}
```

```n8n
{{ ($json.title ?? "").replaceAll(" ", "-") }}
```

Voir la page :

```text
Expressions n8n → Text
```

---

## Math

Exemples courants :

```n8n
{{ (Number($json.amount ?? 0) * 1.2).round(2) }}
```

```n8n
{{ Math.abs($json.amount ?? 0) }}
```

```n8n
{{ ($json.quantity ?? 0) % 2 === 0 }}
```

```n8n
{{ Math.floor(Math.random() * 10) + 1 }}
```

Voir la page :

```text
Expressions n8n → Math
```

---

## Date and Time

n8n utilise Luxon pour manipuler les dates dans les expressions.

Exemples courants :

```n8n
{{ $now }}
```

```n8n
{{ $today.toFormat('yyyy-MM-dd') }}
```

```n8n
{{ $now.plus(7, 'days') }}
```

```n8n
{{ $json.createdAt.toDateTime().toISO() }}
```

Voir la page :

```text
Expressions n8n → Date and Time
```

---

## Arrays

Exemples courants :

```n8n
{{ $json.items.length }}
```

```n8n
{{ $json.items[0] }}
```

```n8n
{{ $json.items.map(item => item.name) }}
```

```n8n
{{ $json.items.filter(item => item.active) }}
```

Voir la page :

```text
Expressions n8n → Arrays
```

---

## Objects

Exemples courants :

```n8n
{{ Object.keys($json) }}
```

```n8n
{{ Object.values($json) }}
```

```n8n
{{ $json.hasOwnProperty("email") }}
```

```n8n
{{ { email: $json.email, country: $json.country } }}
```

---

## Expressions longues

Pour des expressions avec plusieurs instructions, utiliser une fonction immédiatement invoquée, aussi appelée **IIFE**.

Exemple :

```n8n
{{ (() => {
  const amount = Number($json.amount ?? 0);
  const taxRate = 0.2;
  return (amount * (1 + taxRate)).round(2);
})() }}
```

:::warning
Si l’expression dépasse quelques lignes ou devient difficile à lire, utiliser plutôt le **Code node**.
:::

---

## Null safety

Les champs peuvent être absents selon les items. Il faut donc protéger les expressions.

Recommandé :

```n8n
{{ ($json.email ?? "").trim().toLowerCase() }}
```

À éviter :

```n8n
{{ $json.email.trim().toLowerCase() }}
```

Pourquoi ?

Si `email` est absent ou `null`, l’expression peut échouer.

---

## NaN safety

Quand une valeur vient d’une API, d’un formulaire ou d’un fichier, elle peut ne pas être numérique.

Recommandé :

```n8n
{{ Number.isFinite(Number($json.amount)) ? Number($json.amount) : 0 }}
```

Avec calcul :

```n8n
{{ ((Number.isFinite(Number($json.amount)) ? Number($json.amount) : 0) * 1.2).round(2) }}
```

---

## Date safety

Quand une date peut être absente :

```n8n
{{ $json.createdAt ? $json.createdAt.toDateTime().toISO() : null }}
```

Avec valeur par défaut :

```n8n
{{ $json.createdAt ? $json.createdAt.toDateTime().toISO() : "Empty" }}
```

À éviter :

```n8n
{{ $json.createdAt.toDateTime().toISO() }}
```

---

## Expressions dans HTTP Request

### URL dynamique

```n8n
{{ "https://api.example.com/users/" + $json.userId }}
```

### Query parameter encodé

```n8n
{{ encodeURIComponent($json.search ?? "") }}
```

### Header dynamique

```n8n
{{ "Bearer " + $json.access_token }}
```

:::warning
Ne pas hardcoder de token, clé API, mot de passe ou secret dans une expression.  
Utiliser les **credentials n8n** quand c’est possible.
:::

---

## Expressions dans Edit Fields / Set

Exemple de mapping :

```json
{
  "email_clean": "{{ ($json.email ?? \"\").trim().toLowerCase() }}",
  "country_clean": "{{ ($json.country ?? \"Empty\").trim().toUpperCase() }}",
  "amount_tax_included": "{{ (Number($json.amount ?? 0) * 1.2).round(2) }}",
  "created_at_iso": "{{ $json.createdAt ? $json.createdAt.toDateTime().toISO() : null }}"
}
```

---

## Expressions dans IF

Exemples de conditions :

```n8n
{{ ($json.status ?? "") === "active" }}
```

```n8n
{{ Number($json.amount ?? 0) > 100 }}
```

```n8n
{{ $json.createdAt ? $json.createdAt.toDateTime() > $now.minus(7, 'days') : false }}
```

---

## Erreurs fréquentes

| Erreur | Cause probable | Correction |
| --- | --- | --- |
| `Cannot read properties of undefined` | Champ absent | Utiliser `??` ou tester l’existence du champ |
| `trim is not a function` | La valeur n’est pas du texte | Convertir avec `String(value)` |
| `toDateTime is not a function` | La valeur n’est pas compatible ou absente | Tester le champ avant conversion |
| `NaN` | Conversion numérique invalide | Utiliser `Number.isFinite(Number(value))` |
| Résultat vide | Mauvais chemin JSON | Vérifier l’input du node précédent |
| Mauvais item utilisé | Problème d’item linking ou référence node | Utiliser `$json` ou vérifier le node référencé |
| Secret exposé | Token écrit en dur | Utiliser les credentials n8n |

---

## Checklist de test

Avant de valider une expression :

- [ ] Tester avec un item complet.
- [ ] Tester avec un champ absent.
- [ ] Tester avec une valeur `null`.
- [ ] Tester avec une chaîne vide.
- [ ] Tester avec un type inattendu.
- [ ] Vérifier le résultat dans le preview du champ.
- [ ] Vérifier que les credentials ne sont pas exposés.
- [ ] Vérifier le comportement sur plusieurs items.
- [ ] Lancer une exécution complète du workflow.

---

## Bonnes pratiques

### Faire simple

Préférer :

```n8n
{{ ($json.email ?? "").trim().toLowerCase() }}
```

À une expression longue difficile à maintenir.

---

### Protéger les champs absents

```n8n
{{ $json.country ?? "Empty" }}
```

---

### Encoder les valeurs dans les URLs

```n8n
{{ encodeURIComponent($json.search ?? "") }}
```

---

### Ne pas exposer les secrets

Éviter :

```n8n
{{ "Bearer sk_live_xxxxxxxxx" }}
```

Préférer les credentials n8n.

---

### Passer au Code node si nécessaire

Si l’expression devient longue :

```text
Utiliser Code node
```

---

## Structure de cette section

| Page | Contenu |
| --- | --- |
| Text | Fonctions de texte : trim, uppercase, replace, substring |
| Math | Fonctions numériques : round, abs, mod, power, format |
| Date and Time | Dates, timezones, Luxon, format, diff |
| Arrays | Tableaux : map, filter, length, join |
| Conditions | If, ternaires, comparaisons, booléens |
| Objects | Objets JSON, clés, valeurs, champs optionnels |

---

## Quick reference

| Besoin | Expression n8n |
| --- | --- |
| Lire un champ | `{{ $json.email }}` |
| Champ imbriqué | `{{ $json.user.email }}` |
| Champ avec espace | `{{ $json["first name"] }}` |
| Valeur par défaut | `{{ $json.country ?? "Empty" }}` |
| If simple | `{{ $json.active ? "Yes" : "No" }}` |
| Texte propre | `{{ ($json.email ?? "").trim().toLowerCase() }}` |
| Nombre sûr | `{{ Number.isFinite(Number($json.amount)) ? Number($json.amount) : 0 }}` |
| TVA 20 % | `{{ (Number($json.amount ?? 0) * 1.2).round(2) }}` |
| Date ISO | `{{ $now.toISO() }}` |
| Date formatée | `{{ $now.toFormat('yyyy-MM-dd') }}` |
| URL encodée | `{{ encodeURIComponent($json.search ?? "") }}` |
| Condition active | `{{ ($json.status ?? "") === "active" }}` |
| Début du mois | `{{ $now.startOf('month') }}` |
| Tableau longueur | `{{ $json.items.length }}` |
| Premier élément | `{{ $json.items[0] }}` |

---

## Références

- n8n Expressions: https://docs.n8n.io/data/expressions/
- n8n Expression Reference: https://docs.n8n.io/data/expression-reference/
- n8n Expressions for data transformation: https://docs.n8n.io/data/expressions-for-transformation/
- n8n Data mapping: https://docs.n8n.io/data/data-mapping/
- n8n Code node: https://docs.n8n.io/code/code-node/
