---
id: dates
title: Date and Time
sidebar_label: Date and Time
---

# Date and Time

Dans n8n, les manipulations de dates et heures se font principalement avec :

- les **expressions n8n** ;
- la librairie **Luxon**, intégrée dans les expressions ;
- les variables pratiques comme `$now` et `$today` ;
- le node **Date & Time** pour les conversions ou calculs sans code ;
- le **Code node** pour les traitements complexes.

Une expression n8n s’écrit avec :

```n8n
{{ ... }}
```

Exemple :

```n8n
{{ $now }}
```

Exemple avec transformation :

```n8n
{{ $now.plus(7, 'days') }}
```

Exemple avec une date venant d’un item JSON :

```n8n
{{ $json.createdAt.toDateTime().plus(7, 'days') }}
```

:::info
n8n transporte souvent les dates entre nodes sous forme de chaînes de caractères.  
Pour manipuler une date, il est recommandé de la convertir avec `.toDateTime()`.
:::

---

## Fonctions disponibles

| Name | Description |
| --- | --- |
| [AddDays](#adddays)(DateTime, Integer) | Ajoute `n` jours à une date. |
| [AddHours](#addhours)(DateTime, Integer) | Ajoute `n` heures à une date. |
| [AddMinutes](#addminutes)(DateTime, Integer) | Ajoute `n` minutes à une date. |
| [AddMonths](#addmonths)(DateTime, Integer) | Ajoute `n` mois à une date. |
| [AddSeconds](#addseconds)(DateTime, Integer) | Ajoute `n` secondes à une date. |
| [AddYears](#addyears)(DateTime, Integer) | Ajoute `n` années à une date. |
| [SubtractDays](#subtractdays)(DateTime, Integer) | Retire `n` jours à une date. |
| [CurrDate](#currdate)() | Retourne la date courante. |
| [CurrDateTime](#currdatetime)() | Retourne la date et heure courantes. |
| [CurrTime](#currtime)() | Retourne l’heure courante. |
| [Day](#day)(DateTime) | Retourne le jour du mois. |
| [DayOfWeek](#dayofweek)(DateTime) | Retourne le jour de la semaine. |
| [DiffDays](#diffdays)(DateTime, DateTime) | Retourne la différence en jours entre deux dates. |
| [DiffHours](#diffhours)(DateTime, DateTime) | Retourne la différence en heures entre deux dates. |
| [DiffMinutes](#diffminutes)(DateTime, DateTime) | Retourne la différence en minutes entre deux dates. |
| [DiffSeconds](#diffseconds)(DateTime, DateTime) | Retourne la différence en secondes entre deux dates. |
| [FormatDateTime](#formatdatetime)(DateTime, Text) | Formate une date en texte. |
| [Hour](#hour)(DateTime) | Retourne l’heure. |
| [Minute](#minute)(DateTime) | Retourne les minutes. |
| [Month](#month)(DateTime) | Retourne le mois. |
| [NewDate](#newdate)(Integer, Integer, Integer) | Crée une date à partir de l’année, du mois et du jour. |
| [NewDateTime](#newdatetime)(Integer, Integer, Integer, Integer, Integer, Integer) | Crée une date/heure complète. |
| [Second](#second)(DateTime) | Retourne les secondes. |
| [ToISO](#toiso)(DateTime) | Convertit une date au format ISO. |
| [ToUTC](#toutc)(DateTime) | Convertit une date en UTC. |
| [Year](#year)(DateTime) | Retourne l’année. |

---

## Notes sur les timezones et DST

n8n utilise Luxon pour manipuler les dates en JavaScript.

Les points importants :

- `$now` retourne la date et heure courantes.
- `$today` retourne la date courante au début de la journée.
- Une date venant d’un node est souvent une chaîne et doit être convertie avec `.toDateTime()`.
- Les fuseaux horaires peuvent influencer le résultat.
- Les changements d’heure, DST, peuvent produire des résultats inattendus si l’on manipule des heures locales.

Exemple recommandé avec timezone explicite :

```n8n
{{ $now.setZone('Europe/Paris') }}
```

Exemple en UTC :

```n8n
{{ $now.toUTC() }}
```

---

## AddDays

Ajoute `n` jours à une date et retourne une DateTime.

### Available in

- Expressions: Yes
- Edit Fields / Set node: Yes
- IF node fields: Yes
- HTTP Request node fields: Yes
- Code node: Yes, en JavaScript avec Luxon ou Date

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'days') }}
```

Ou avec la date courante :

```n8n
{{ $now.plus(n, 'days') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre de jours à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "2015-09-14".toDateTime().plus(15, 'days') }}
```

Output:

```text
2015-09-29T00:00:00.000+...
```

```n8n
{{ "2015-12-31".toDateTime().plus(1, 'days') }}
```

Output:

```text
2016-01-01T00:00:00.000+...
```

Avec un champ JSON :

```n8n
{{ $json.createdAt.toDateTime().plus(7, 'days') }}
```

---

## AddHours

Ajoute `n` heures à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'hours') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre d’heures à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().plus(1, 'hours') }}
```

Output:

```text
1982-05-21T23:20:30.000+...
```

```n8n
{{ "2001-10-12T23:20:00".toDateTime().plus(5, 'hours') }}
```

Output:

```text
2001-10-13T04:20:00.000+...
```

---

## AddMinutes

Ajoute `n` minutes à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'minutes') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre de minutes à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().plus(1, 'minutes') }}
```

Output:

```text
1982-05-21T22:21:30.000+...
```

```n8n
{{ "2001-10-12T23:55:00".toDateTime().plus(5, 'minutes') }}
```

Output:

```text
2001-10-13T00:00:00.000+...
```

---

## AddMonths

Ajoute `n` mois à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'months') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre de mois à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "2001-09-14".toDateTime().plus(2, 'months') }}
```

Output:

```text
2001-11-14T00:00:00.000+...
```

```n8n
{{ "2001-12-14".toDateTime().plus(2, 'months') }}
```

Output:

```text
2002-02-14T00:00:00.000+...
```

Fin de mois :

```n8n
{{ "2004-01-31".toDateTime().plus(1, 'months') }}
```

Output possible :

```text
2004-02-29T00:00:00.000+...
```

---

## AddSeconds

Ajoute `n` secondes à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'seconds') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre de secondes à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "2015-05-21T22:20:30".toDateTime().plus(60, 'seconds') }}
```

Output:

```text
2015-05-21T22:21:30.000+...
```

```n8n
{{ "2003-10-21T23:59:50".toDateTime().plus(11, 'seconds') }}
```

Output:

```text
2003-10-22T00:00:01.000+...
```

---

## AddYears

Ajoute `n` années à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().plus(n, 'years') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre d’années à ajouter.

### Output

Type: DateTime

### Examples

```n8n
{{ "2001-09-14".toDateTime().plus(3, 'years') }}
```

Output:

```text
2004-09-14T00:00:00.000+...
```

```n8n
{{ "2004-02-29".toDateTime().plus(1, 'years') }}
```

Output possible:

```text
2005-02-28T00:00:00.000+...
```

---

## SubtractDays

Retire `n` jours à une DateTime.

### Syntax

```n8n
{{ date.toDateTime().minus(n, 'days') }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
La date source.

n
: Type: Integer. Mandatory.  
Nombre de jours à retirer.

### Output

Type: DateTime

### Examples

```n8n
{{ "2024-04-10".toDateTime().minus(7, 'days') }}
```

Output:

```text
2024-04-03T00:00:00.000+...
```

Avec `$now` :

```n8n
{{ $now.minus(30, 'days') }}
```

---

## CurrDate

Retourne la date courante.

### Syntax

```n8n
{{ $today }}
```

### Output

Type: DateTime

### Examples

```n8n
{{ $today }}
```

Format `yyyy-MM-dd` :

```n8n
{{ $today.toFormat('yyyy-MM-dd') }}
```

Output:

```text
2026-06-15
```

---

## CurrDateTime

Retourne la date et heure courantes.

### Syntax

```n8n
{{ $now }}
```

### Output

Type: DateTime

### Examples

```n8n
{{ $now }}
```

Format ISO :

```n8n
{{ $now.toISO() }}
```

Output:

```text
2026-06-15T13:30:00.000+02:00
```

---

## CurrTime

Retourne l’heure courante.

### Syntax

```n8n
{{ $now.toFormat('HH:mm:ss') }}
```

### Output

Type: Text

### Examples

```n8n
{{ $now.toFormat('HH:mm:ss') }}
```

Output:

```text
13:30:00
```

---

## Day

Retourne le jour du mois.

### Syntax

```n8n
{{ date.toDateTime().day }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
Date source.

### Output

Type: Integer

### Examples

```n8n
{{ "2015-07-14".toDateTime().day }}
```

Output:

```text
14
```

Avec un champ JSON :

```n8n
{{ $json.createdAt.toDateTime().day }}
```

---

## DayOfWeek

Retourne le jour de la semaine.

:::warning
Différence importante avec OutSystems :

- OutSystems : `0 = Sunday`, `6 = Saturday`.
- Luxon / n8n : `1 = Monday`, `7 = Sunday`.
:::

### Syntax

```n8n
{{ date.toDateTime().weekday }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
Date source.

### Output

Type: Integer

### Examples

```n8n
{{ "2001-09-14".toDateTime().weekday }}
```

Output:

```text
5
```

Nom du jour :

```n8n
{{ "2001-09-14".toDateTime().setLocale('fr-FR').weekdayLong }}
```

Output:

```text
vendredi
```

---

## DiffDays

Retourne la différence en jours entre deux dates.

### Syntax

```n8n
{{ date1.toDateTime().diffTo(date2, 'days') }}
```

### Parameters

date1
: Type: DateTime or Text. Mandatory.  
Première date.

date2
: Type: DateTime or Text. Mandatory.  
Deuxième date.

### Output

Type: Number

### Examples

```n8n
{{ "1982-05-19".toDateTime().diffTo("1982-05-21", 'days') }}
```

Output:

```text
2
```

```n8n
{{ "1982-05-21".toDateTime().diffTo("1982-05-19", 'days') }}
```

Output:

```text
-2
```

Arrondir à l’entier inférieur :

```n8n
{{ Math.floor("1982-05-19".toDateTime().diffTo("1982-05-21", 'days')) }}
```

---

## DiffHours

Retourne la différence en heures entre deux dates.

### Syntax

```n8n
{{ date1.toDateTime().diffTo(date2, 'hours') }}
```

### Output

Type: Number

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().diffTo("1982-05-22T02:00:00", 'hours') }}
```

Output:

```text
3.658333333333333
```

Arrondir :

```n8n
{{ Math.round("1982-05-21T22:20:30".toDateTime().diffTo("1982-05-22T02:00:00", 'hours')) }}
```

Output:

```text
4
```

---

## DiffMinutes

Retourne la différence en minutes entre deux dates.

### Syntax

```n8n
{{ date1.toDateTime().diffTo(date2, 'minutes') }}
```

### Output

Type: Number

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().diffTo("1982-05-21T22:26:00", 'minutes') }}
```

Output:

```text
5.5
```

Arrondir :

```n8n
{{ Math.round("1982-05-21T22:20:30".toDateTime().diffTo("1982-05-21T22:26:00", 'minutes')) }}
```

Output:

```text
6
```

---

## DiffSeconds

Retourne la différence en secondes entre deux dates.

### Syntax

```n8n
{{ date1.toDateTime().diffTo(date2, 'seconds') }}
```

### Output

Type: Number

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().diffTo("1982-05-21T22:21:05", 'seconds') }}
```

Output:

```text
35
```

---

## FormatDateTime

Formate une DateTime en texte.

### Syntax

```n8n
{{ date.toDateTime().toFormat(format) }}
```

### Parameters

date
: Type: DateTime or Text. Mandatory.  
Date source.

format
: Type: Text. Mandatory.  
Format Luxon.

### Output

Type: Text

### Examples

```n8n
{{ "2024-03-30T18:49:07".toDateTime().toFormat('yyyy-MM-dd') }}
```

Output:

```text
2024-03-30
```

```n8n
{{ "2024-03-30T18:49:07".toDateTime().toFormat('dd/MM/yyyy HH:mm:ss') }}
```

Output:

```text
30/03/2024 18:49:07
```

Avec locale française :

```n8n
{{ "2024-03-30T18:49:07".toDateTime().setLocale('fr-FR').toFormat('cccc dd LLLL yyyy') }}
```

Output:

```text
samedi 30 mars 2024
```

---

## Hour

Retourne l’heure d’une DateTime.

### Syntax

```n8n
{{ date.toDateTime().hour }}
```

### Output

Type: Integer

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().hour }}
```

Output:

```text
22
```

---

## Minute

Retourne les minutes d’une DateTime.

### Syntax

```n8n
{{ date.toDateTime().minute }}
```

### Output

Type: Integer

### Examples

```n8n
{{ "1982-05-21T22:20:30".toDateTime().minute }}
```

Output:

```text
20
```

---

## Month

Retourne le mois d’une DateTime.

### Syntax

```n8n
{{ date.toDateTime().month }}
```

### Output

Type: Integer

### Examples

```n8n
{{ "2001-09-14".toDateTime().month }}
```

Output:

```text
9
```

Nom du mois :

```n8n
{{ "2001-09-14".toDateTime().setLocale('fr-FR').monthLong }}
```

Output:

```text
septembre
```

---

## NewDate

Crée une date à partir de l’année, du mois et du jour.

:::warning
En JavaScript natif, les mois commencent à `0`.  
Avec Luxon `DateTime.fromObject`, les mois commencent à `1`.

Recommandé dans n8n : utiliser `DateTime.fromObject`.
:::

### Syntax

```n8n
{{ DateTime.fromObject({ year: y, month: m, day: d }) }}
```

### Parameters

y
: Type: Integer. Mandatory.  
Année.

m
: Type: Integer. Mandatory.  
Mois, de 1 à 12.

d
: Type: Integer. Mandatory.  
Jour du mois.

### Output

Type: DateTime

### Examples

```n8n
{{ DateTime.fromObject({ year: 2002, month: 6, day: 3 }) }}
```

Output:

```text
2002-06-03T00:00:00.000+...
```

Format date :

```n8n
{{ DateTime.fromObject({ year: 2002, month: 6, day: 3 }).toFormat('yyyy-MM-dd') }}
```

Output:

```text
2002-06-03
```

---

## NewDateTime

Crée une DateTime à partir de l’année, du mois, du jour, de l’heure, des minutes et des secondes.

### Syntax

```n8n
{{ DateTime.fromObject({ year: y, month: mo, day: d, hour: h, minute: mi, second: s }) }}
```

### Parameters

y
: Type: Integer. Mandatory.  
Année.

mo
: Type: Integer. Mandatory.  
Mois, de 1 à 12.

d
: Type: Integer. Mandatory.  
Jour du mois.

h
: Type: Integer. Mandatory.  
Heure, de 0 à 23.

mi
: Type: Integer. Mandatory.  
Minutes, de 0 à 59.

s
: Type: Integer. Mandatory.  
Secondes, de 0 à 59.

### Output

Type: DateTime

### Examples

```n8n
{{ DateTime.fromObject({ year: 2002, month: 6, day: 3, hour: 22, minute: 0, second: 59 }) }}
```

Output:

```text
2002-06-03T22:00:59.000+...
```

---

## Second

Retourne les secondes d’une DateTime.

### Syntax

```n8n
{{ date.toDateTime().second }}
```

### Output

Type: Integer

### Examples

```n8n
{{ "2015-05-21T22:20:30".toDateTime().second }}
```

Output:

```text
30
```

---

## ToISO

Convertit une DateTime en chaîne ISO.

### Syntax

```n8n
{{ date.toDateTime().toISO() }}
```

Ou avec la date courante :

```n8n
{{ $now.toISO() }}
```

### Output

Type: Text

### Examples

```n8n
{{ "2024-03-30T18:49:07".toDateTime().toISO() }}
```

Output:

```text
2024-03-30T18:49:07.000+...
```

---

## ToUTC

Convertit une DateTime en UTC.

### Syntax

```n8n
{{ date.toDateTime().toUTC() }}
```

### Output

Type: DateTime

### Examples

```n8n
{{ "2024-01-01T00:00:00+02:00".toDateTime().toUTC() }}
```

Output:

```text
2023-12-31T22:00:00.000Z
```

---

## Year

Retourne l’année d’une DateTime.

### Syntax

```n8n
{{ date.toDateTime().year }}
```

### Output

Type: Integer

### Examples

```n8n
{{ "2015-07-14".toDateTime().year }}
```

Output:

```text
2015
```

---

## Common patterns

### Date actuelle au format `yyyy-MM-dd`

```n8n
{{ $now.toFormat('yyyy-MM-dd') }}
```

### Date actuelle au format français

```n8n
{{ $now.setLocale('fr-FR').toFormat('dd/MM/yyyy HH:mm:ss') }}
```

### Ajouter 7 jours à une date JSON

```n8n
{{ $json.createdAt.toDateTime().plus(7, 'days') }}
```

### Calculer une deadline à J+30

```n8n
{{ $now.plus(30, 'days').toFormat('yyyy-MM-dd') }}
```

### Vérifier si une date est passée

```n8n
{{ $json.dueDate.toDateTime() < $now }}
```

### Vérifier si une date est dans le futur

```n8n
{{ $json.dueDate.toDateTime() > $now }}
```

### Vérifier si une date est entre deux dates

```n8n
{{ $json.date.toDateTime().isBetween('2024-01-01', '2024-12-31') }}
```

### Différence en jours entre aujourd’hui et une deadline

```n8n
{{ $now.diffTo($json.deadline.toDateTime(), 'days') }}
```

### Arrondir une différence en jours

```n8n
{{ Math.ceil($now.diffTo($json.deadline.toDateTime(), 'days')) }}
```

### Obtenir le début du mois courant

```n8n
{{ $now.startOf('month') }}
```

### Obtenir la fin du mois courant

```n8n
{{ $now.endOf('month') }}
```

### Convertir en UTC avant envoi API

```n8n
{{ $json.createdAt.toDateTime().toUTC().toISO() }}
```

---

## Usage in Edit Fields / Set node

Exemple de configuration dans un node **Edit Fields** ou **Set** :

```json
{
  "created_at_iso": "{{ $json.createdAt.toDateTime().toISO() }}",
  "created_at_fr": "{{ $json.createdAt.toDateTime().setLocale('fr-FR').toFormat('dd/MM/yyyy HH:mm:ss') }}",
  "deadline": "{{ $now.plus(30, 'days').toFormat('yyyy-MM-dd') }}",
  "is_overdue": "{{ $json.dueDate.toDateTime() < $now }}"
}
```

---

## Usage in Code node

Pour des transformations plus longues, utiliser le **Code node**.

Mode recommandé pour cet exemple : **Run Once for Each Item**.

```javascript
const createdAtRaw = $json.createdAt;
const dueDateRaw = $json.dueDate;

const createdAt = createdAtRaw ? DateTime.fromISO(createdAtRaw) : null;
const dueDate = dueDateRaw ? DateTime.fromISO(dueDateRaw) : null;

return {
  json: {
    ...$json,
    created_at_iso: createdAt ? createdAt.toISO() : null,
    created_at_fr: createdAt ? createdAt.setLocale('fr-FR').toFormat('dd/MM/yyyy HH:mm:ss') : null,
    deadline_30_days: DateTime.now().plus({ days: 30 }).toISODate(),
    is_overdue: dueDate ? dueDate < DateTime.now() : false,
  },
};
```

:::warning
Dans le Code node, vérifie toujours que le champ date existe avant de le parser.  
Une date absente, vide ou invalide peut produire un résultat invalide.
:::

---

## Notes

### Expressions vs Date & Time node

Utiliser les **expressions** pour :

- ajouter ou retirer quelques jours ;
- formater une date dans un champ ;
- comparer deux dates ;
- construire une valeur de date pour une API ;
- extraire l’année, le mois, le jour ou l’heure.

Utiliser le **Date & Time node** pour :

- convertir des formats de date ;
- standardiser les dates avant un envoi API ;
- manipuler des dates sans expression complexe ;
- rendre le workflow plus lisible pour des utilisateurs non techniques.

Utiliser le **Code node** pour :

- traiter plusieurs champs date en même temps ;
- appliquer des règles métier complexes ;
- gérer plusieurs formats possibles ;
- créer des objets date structurés ;
- manipuler des tableaux d’items.

---

## Null safety

Recommandé :

```n8n
{{ $json.createdAt ? $json.createdAt.toDateTime().toISO() : null }}
```

Avec valeur par défaut :

```n8n
{{ $json.createdAt ? $json.createdAt.toDateTime().toISO() : "Empty" }}
```

À éviter si le champ peut être absent :

```n8n
{{ $json.createdAt.toDateTime().toISO() }}
```

---

## Quick reference

| Besoin | Expression n8n |
| --- | --- |
| Date et heure actuelles | `{{ $now }}` |
| Date actuelle | `{{ $today }}` |
| Format `yyyy-MM-dd` | `{{ $now.toFormat('yyyy-MM-dd') }}` |
| Format français | `{{ $now.setLocale('fr-FR').toFormat('dd/MM/yyyy HH:mm:ss') }}` |
| Ajouter 7 jours | `{{ $now.plus(7, 'days') }}` |
| Retirer 30 jours | `{{ $now.minus(30, 'days') }}` |
| Ajouter 2 mois | `{{ $now.plus(2, 'months') }}` |
| Ajouter 1 an | `{{ $now.plus(1, 'years') }}` |
| Jour du mois | `{{ $now.day }}` |
| Jour semaine | `{{ $now.weekday }}` |
| Mois | `{{ $now.month }}` |
| Année | `{{ $now.year }}` |
| Heure | `{{ $now.hour }}` |
| Minutes | `{{ $now.minute }}` |
| Secondes | `{{ $now.second }}` |
| Différence en jours | `{{ date1.toDateTime().diffTo(date2, 'days') }}` |
| Date passée ? | `{{ $json.dueDate.toDateTime() < $now }}` |
| Date future ? | `{{ $json.dueDate.toDateTime() > $now }}` |
| Convertir en ISO | `{{ $json.date.toDateTime().toISO() }}` |
| Convertir en UTC | `{{ $json.date.toDateTime().toUTC().toISO() }}` |
| Début du mois | `{{ $now.startOf('month') }}` |
| Fin du mois | `{{ $now.endOf('month') }}` |

---

## Références

- n8n Date and time with Luxon: https://docs.n8n.io/data/specific-data-types/luxon/
- n8n DateTime expression reference: https://docs.n8n.io/data/expression-reference/datetime/
- n8n Date & Time node: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datetime/