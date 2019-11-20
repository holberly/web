/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycastor.monhelloworld;

import org.apache.log4j.Logger;

/**
 *
 * @author Amely
 */
public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class);

    public static void main(String args[]){
        Hello chaine = new Hello("abc");
        chaine.afficher(chaine.getChaineinit());
        LOGGER.info("ceci est un message de niveau info");
    }
}
