sitemap = {

    'funcModel': '/problem/1/tasks/role/functional/model',
    'funcEval': '/problem/1/tasks/role/functional/evaluate',
    'funcPlan': '/problem/1/tasks/role/functional/evaluate',

    'quantModel': '/problem/1/tasks/role/quantitative/model',
    'quantEval': '/problem/1/tasks/role/quantitative/evaluate',
    'quantPlan': '/problem/1/tasks/role/quantitative/evaluate',

    'qualModel': '/problem/1/tasks/role/qualitative/model',
    'qualEval': '/problem/1/tasks/role/qualitative/evaluate',
    'qualPlan': '/problem/1/tasks/role/qualitative/evaluate',

    'map': '/problem/1/map',
    'simulator': '/problem/1/simulator',

    'info': '/information',
    'calculator': '/calculator',
    'scratch': '/scratch',

}

function urlDispatchHandler(id, obj) {
    window.open(sitemap[obj], target = "_self");
}

function urlDispatchHandler(id, obj, isUrl) {
    window.open(sitemap[obj], target = "_self");
}
