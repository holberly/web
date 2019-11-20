/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycastor.monhelloworld;

/**
 *
 * @author Amely
 */
class Hello {
    private String chaineinit; 

    /***
     * Test
     * @param chaineinit 
     */
    public Hello(String chaineinit) {
        this.chaineinit = chaineinit;
    }


    public String getChaineinit() {
        return chaineinit;
    }

    public void setChaineinit(String chaineinit) {
        this.chaineinit = chaineinit;
    }
    
    public void afficher(String chaine){
        System.out.println(chaine);
    }
    
}
