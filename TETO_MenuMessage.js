/*:
@author SputnikTETO
@plugindesc A plugin that shows message after closing the menu

@param Message Shown
@desc The message shown in the menu.
@type text
@default Hello world

@param Menu Message
@type boolean
@default true

@param Message Background Type
@desc Normal(0)/Dim(1)/Transparent(2)
@type number
@default 0

@target MV

@help
This plugin shows messages after the menu is closed.
It can be used for: Game hints, To guide the player etc.

------------------------------------------------------------------------------------------------------------------
PARAMETERS:

Message Shown: Type = text
- Is the message shown after the menu is closed

Menu Message: Type = boolean (true/false)
- Enables or disables the menu message

Message Background Type: Type = number
- Changes the menu message background type (Normal(0)/Dim(1)/Transparent(2))
------------------------------------------------------------------------------------------------------------------
PLUGIN COMMANDS:

SetMessage true/false(changes Menu Message) message(changes Message Shown) 0/1/2(changes Message Background Type)

Examples:
SetMessage true Hello World and Others 2

SetMessage false Hello Heaven 0
------------------------------------------------------------------------------------------------------------------
MIT License

Copyright (c) 2026 SputnikTETO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/

class TetoMM {
    static init() {
        const parameters = PluginManager.parameters("TETO_MenuMessage");
        TetoMM.messageShown = parameters["Message Shown"];
        TetoMM.tf = parameters["Menu Message"] === "true";
        TetoMM.msgBack = Number(parameters["Message Background Type"]);
    }
}

TetoMM.init();

// -------------------------
// Plugin Commands
// -------------------------
(function() {
    const _pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _pluginCommand.call(this, command, args);

        if (command === "SetMessage") {
            TetoMM.tf = (args[0] === "true");
            TetoMM.messageShown = args.slice(1, -1).join(" ");
            TetoMM.msgBack = Number(args[args.length - 1]);
        }
    };
})();


//-------------------
// Menu Scene
//-------------------
(function() {

    let _menuWasOpen = false;

    const _SceneMenu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function() {
        _SceneMenu_start.call(this);
        _menuWasOpen = true;
    };

    const _SceneMap_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _SceneMap_start.call(this);

        if (_menuWasOpen && TetoMM.tf) {
            _menuWasOpen = false; 
            $gameMessage.setBackground(TetoMM.msgBack);
            $gameMessage.add(TetoMM.messageShown);
        }
    };

})();
