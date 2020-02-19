# Frag zur Wahl

#### frag-zur-wahl.de ist eine offene und unabhängige Plattform zur Förderung des Dialogs und der Demokratie vor Bürgermeisterwahlen.

> Sie können dieses System selber hosten oder eine E-Mail an system@frag-zur-wahl.de schreiben. Für das Bereitstellen der Dienste verlangen wir kein Geld. Wir behalten uns aber vor, zu überprüfen, ob Sie gegenüber den Kandidierenden unparteiisch sind.

### Konzept

frag-zur-wahl.de bietet eine Plattform für Bürgerinnen und Bürger, auf welcher diese Fragen an die Kandidierenden des Bürgermeisteramtes stellen können. Diese werden per E-Mail über Fragen benachrichtigt und haben die Möglichkeit, auf diese zu antworten. Das System wurde von dem Entwickler Jonathan Fritz aus Lorch anlässlich der Bürgermeisterwahl 2020 entwickelt.
Das System steht der Öffentlichkeit hiermit zur freien Verfügung.
> Kontakt zu dem Entwickler erhalten Sie unter fritz@nosc.io.

### Verfügbarkeit

Das System steht unter der GNU Affero General Public License v3.0.
Sie dürfen dieses Projekt nutzen, modifizieren und veröffentlichen. Jedoch muss die Lizenz gleich bleiben und der Code quelloffen verfügbar sein. Die genauen Lizenzbedingungen finden Sie am Ende dieses Dokuments. Bei Fragen können Sie sich an uns wenden.

#### Bei frag-zur-wahl.de hosten

Kontaktieren Sie uns, wenn Sie dieses Portal anlässlich einer Wahl auf kommunaler Ebene bereitstellen wollen. Wir verlangen keine Unkosten für das Bereitstellen des Portals - bitte bedenken Sie aber, dass Sie in der Verantwortung für das Portal sind und wir Sie nicht unterstützen können, Kandidierende anzufragen und über die Existenz des Portals in Ihrer Region zu informieren.

#### Selber hosten

Folgen Sie den Installationsanleitungen. Sollten Sie Verbesserungen oder Optimierungen am Code vornehmen, würden wir uns freuen, wenn Sie eine PR erstellen.

### Installation und Setup

> Das Setup ist noch nicht vollständig.
> #### Aktuell läuft dieses Programm auf Google Firebase. Dies war notwendig, um eine schnelle Umsetzung zu ermöglichen. Eine Umstellung läuft. Bitte verwenden Sie das Programm bis dahin nicht.

>DEVELOPMENT SETUP
> #### DIESES SETUP IST NUR ZUR ENTWICKLUNG GEEIGNET.

###### Firebase
Setzen Sie ein Google Firebase Projekt auf.
Kopieren Sie dann die Zugangsdaten in `env/`und ersetzen Sie die vorhandenen Dateien.

###### Plattform
Klonen Sie das Repository:

`git clone https://github.com/chronikum/frag-wahl.git`

Installieren Sie Abhängigkeiten:

`npm install`

Zum Bereitstellen in der Entwicklung:

`npm serve`

### LICENSE

Die Lizenz finden Sie unter LICENCE.MD
