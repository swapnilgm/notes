// mdBook creates <code> elements with the class 'language-mermaid hljs' whenever you
// define a mermaid code block.
// The mermaid javascript parser looks for elements with a class name 'mermaid'.
// So simply change the class name of the elements to 'mermaid' to make everything work.
function patchMermaidCodeElementClass() {
    var elements = document.getElementsByClassName("language-mermaid");
    for(var i=0; i < elements.length; i+=1) {
        var element = elements.item(i);
        if (element.tagName.toLowerCase() == "code") {
            element.className = "mermaid";
        }
    }
}

patchMermaidCodeElementClass();
mermaid.initialize({startOnLoad:true});