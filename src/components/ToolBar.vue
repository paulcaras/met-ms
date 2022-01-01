<template>
    <div class="_t">
        <div class="w">
            <div class="x">
                <ul>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('dash-board')">Dashboard</div>
                        </div>
                     </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('make')">Create</div>
                            <div class="m" v-show="subm.make">
                                <div class="o " @click="goLink('make-tran', 'make')">Register Transformers <span>Ctrl+Alt+R</span></div>
                                <div class="o" @click="goLink('make-pole', 'make')">Register Pole</div>
                                <div class="o" @click="goLink('make-node', 'make')">Register Node</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('tran')">Transformers</div>
                            <div class="m" v-show="subm.tran">
                                <div class="o h" @click="goLink('tran-list', 'tran')">Transformer Manager</div>
                                <div class="o" @click="goLink('pole-mapping', 'tran')">Pole Mapping &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span>Ctrl+Alt+A</span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('repo')">Reports</div>
                            <div class="m" v-show="subm.repo">
                                <div class="o" @click="goLink('repo-tabular', 'repo')">Tabular Readings <span>Ctrl+Alt+R</span></div>
                                <div class="o h" @click="goLink('repo-grapher', 'repo')">Graphs Readings &nbsp;<span>Ctrl+Alt+C</span></div>
                                <div class="o" @click="goLink('repo-critical', 'repo')">Critial Readings &nbsp;<span>Ctrl+Alt+C</span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('mesh-index', 'mesh')">Meshnet</div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="toMenu('sett')">Settings</div>
                            <div class="m" v-show="subm.sett">
                                <div class="o h" @click="goLink('sett-index', 'sett')">Preferences &nbsp;<span>Ctrl+Alt+S</span></div>
                                <div class="o" @click="goLink('sett-index', 'sett')">User Account</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('maps-assets', 'maps')">Models</div>
                        </div>
                    </li>
                    <li>
                        <div class="l">
                            <div class="n" @click="goLink('help-index', 'help')">Help</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="y">
                <ul>
                    <li>
                        <div class="l">
                            <div class="n" style="color: #9b9b97" @click="isModalShow = !isModalShow">optimum 1.0-a</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ui-modal-informer v-if="isModalShow" @informedOkay="modalClose" :hasBG="false" class="moda-l">
            <div slot="text">
                <div class="nn">Optimum v0.1-alpha</div>
                <div class="ii">Distribution Transformer Monitoring System</div>
                <div class="cc">paul, joseph, junrey, nico, kim, jayne</div>
                <div class="ss"><v-icon name="code"></v-icon> with <v-icon name="heart"></v-icon></div>
                <div class="xx" @click="endSession()">exit</div>
            </div>
        </ui-modal-informer>
    </div>
</template>

<script>
    import UIModalInformer from './UIModalInformer.vue';

    import 'vue-awesome/icons/bars';
    import 'vue-awesome/icons/minus';
    import 'vue-awesome/icons/code';
    import 'vue-awesome/icons/heart';

    export default {
        components: {
            UiModalInformer: UIModalInformer
        },
        data() {
            return {
                user: { name: 'Paul', role: 'Administrator' },
                subm: { tran: false, make: false, repo: false, help: false, maps: false, sett: false, mesh: false },
                bars: false,
                isModalShow: false
            }
        },
        methods: {
            goLink(name, view) {
                this.subm = { tran: false, make: false, repo: false, help: false, maps: false, sett: false, mesh: false }
                this.$router.push({ name: name });
            },
            toMenu(name) {
                let d = { tran: false, make: false, repo: false, help: false, maps: false, sett: false, mesh: false };
                d[name] = !this.subm[name];
                this.subm = d;
            },
            endSession() {
                this.$storageDel('api_token', 'local');
                this.$sleep(500).then(() => {
                    this.$router.push( { name: 'load-index'} );
                });
            },
            modalClose(v) {
                this.isModalShow = false;
            }
        }
    }
</script>

<style scoped>
    ._t { height: 24px; background-color: #f8f8f2; ibackground: linear-gradient(to bottom, #f8f8f2, #ebebe7); }

    ._t .w { display: grid; grid-template-columns: auto 200px; border-bottom: 1px solid #EEEEEC; }
    .w .x {}
    ul { display: block; list-style-type: none }
    ul li { display: inline-block;  }
    ul li .l { position: relative; }
    ul li .l .n { font-size: 11px; color: #222; padding: 6px 8px; }
    ul li .l .n:hover { color: #444; background: #e0e0e0; }

    ul li .l .m { padding: 5px 0; position: absolute; top: 100%; width: auto; height: auto; background-color: #fff; z-index: 9999; box-shadow: 0 1px 3px rgba(0,0,0,0.24); }
    ul li .l .m .o { font-size: 11px; color: #222; padding: 5px 16px; white-space: nowrap;  }
    ul li .l .m .o.h { border-bottom: 1px solid #efefea; }
    ul li .l .m .o span { margin-left: 40px; color: #7e7e7a; display: inline-block; text-align: right; }
    ul li .l .m .o:hover { background-color: #315BEF; color: #fff; }
    ul li .l .m .o:hover span { color: #fff; }

    .w .y { text-align: right; }

    .moda-l {}
    .moda-l .nn { padding: 12px 0 2px 0; text-align: center; font-size: 16px; font-weight: 600; color: #222; }
    .moda-l .ii { font-size: 12px; color: #111; text-align: center }
    .moda-l .cc { font-size: 10px; color: #888; text-align: center }
    .moda-l .ss { padding: 10px 0; font-size: 10px; text-align: center; color: #555; }
    .moda-l .ss svg { width: 12px; height: 12px; margin: 0 2px -2px 2px; }
    .moda-l .xx { background-color: #f0f0f0; display: inline-block;  padding: 0 10px; }
</style>
