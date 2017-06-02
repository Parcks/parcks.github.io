(function(){
    const GITHUB_URL_PREFIX = "https://api.github.com/repos/Parcks/";
    let repo_name = document.getElementById("title").innerHTML;
    loadContents(repo_name); 

    function loadContents(repo_name){
        let url = GITHUB_URL_PREFIX+repo_name+"/contents";
        requestChildren(url, "content");
    }

    function requestChildren(url, domParentId){
        let xhr = new XMLHttpRequest();        
        xhr.onreadystatechange = function(){            
            handleReadyStateChanged(this, domParentId);
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function handleReadyStateChanged(xhr, domParentId){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                displayContents(JSON.parse(xhr.response), domParentId);
            }else{
                displayErrorMessage();
            }
        }
    }

    function displayErrorMessage(){
        alert("ERROR");
        //TODO
    }

    function displayContents(response, domParentId){
        console.log(response);
        addList(domParentId, response);
    }

    function addList(parentId, contentsArray){
        let parent = document.getElementById(parentId);
        console.log(parent);
        let ulTag = document.createElement("ul");
        for(let index = 0; index < contentsArray.length; index++){
            createListItem(ulTag, contentsArray[index]);
        }
        parent.appendChild(ulTag);
    }

    function createListItem(ulTag, repoItem){
        let listItem = document.createElement("li");
        listItem.id = repoItem["sha"];
        let child = createListItemChild(repoItem, repoItem["sha"]);
        if(child !== undefined) listItem.appendChild(child);
        ulTag.appendChild(listItem);
    }

    function createListItemChild(repoItem, parentListItemId){
        return (repoItem["type"] === "file") ? createLinkTag(repoItem) : createFolderTag(repoItem, parentListItemId);
    }

    function createFolderTag(repoItem, parentListItemId){
        let pTag = document.createElement("p");
        pTag.textContent = repoItem["name"];
        requestChildren(repoItem["url"], parentListItemId);
        return pTag;
    }

    function createLinkTag(repoItem){
        let linkTag = document.createElement("a");
        createLinkReference(linkTag, repoItem);
        return linkTag;
    }

    function createLinkReference(linkTag, repoItem){
        linkTag.href = repoItem["download_url"];
        linkTag.text = repoItem["name"];
	linkTag.setAttribute("download", repoItem["name"]);
    }
})()
